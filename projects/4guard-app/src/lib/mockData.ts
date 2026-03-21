// Estado: 10 = Andén (inmovilizado), 20 = Bolsa (esperando cliente), 30 = Liberado
export type PalletStatus = 10 | 20 | 30 | 'LOCKED';

export interface Pallet {
  sscc: string;
  id: string;
  sku: string;
  skuName: string;
  quantity: number;
  status: PalletStatus;
  lotDate: string; // ISO date for FEFO/PEPS
  expirationDate: string;
  location: string;
  arrivalTime: string; // ISO datetime, used for bottleneck detection
  reason?: string;
  occupancy?: number;
}

export const MOCK_INVENTORY: Pallet[] = [
  {
    sscc: "003758291000184729",
    id: "BAY-04-A-12",
    sku: "NES-CLA-200",
    skuName: "Nescafé Clásico 200g",
    quantity: 450,
    status: "LOCKED",
    lotDate: "2024-01-10",
    expirationDate: "2026-01-10",
    location: "BAY-04-A-12",
    arrivalTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h ago
    reason: "NOM-251",
    occupancy: 100,
  },
  {
    sscc: "003758291000185001",
    id: "BAY-04-A-13",
    sku: "DOG-CHO-4KG",
    skuName: "Dog Chow 4kg",
    quantity: 120,
    status: 30,
    lotDate: "2024-03-05",
    expirationDate: "2026-06-05",
    location: "BAY-04-A-13",
    arrivalTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    occupancy: 25,
  },
  {
    sscc: "003758291000185100",
    id: "BAY-01-B-05",
    sku: "COK-LAT-355",
    skuName: "Coca-Cola Lata 355ml",
    quantity: 2000,
    status: 30,
    lotDate: "2024-02-18",
    expirationDate: "2025-08-18",
    location: "BAY-01-B-05",
    arrivalTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    occupancy: 88,
  },
  {
    sscc: "003758291000185200",
    id: "BAY-02-C-07",
    sku: "COK-LAT-355",
    skuName: "Coca-Cola Lata 355ml",
    quantity: 500,
    status: 20,
    lotDate: "2024-03-15",
    expirationDate: "2025-09-15",
    location: "BAY-02-C-07",
    arrivalTime: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5h, should trigger bottleneck
    reason: "Esperando validación Nestlé",
    occupancy: 60,
  },
  {
    sscc: "003758291000185300",
    id: "BAY-03-A-02",
    sku: "NES-CLA-200",
    skuName: "Nescafé Clásico 200g",
    quantity: 300,
    status: 10,
    lotDate: "2024-03-19",
    expirationDate: "2026-03-19",
    location: "BAY-03-A-02",
    arrivalTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    occupancy: 50,
  },
  {
    sscc: "003758291000185400",
    id: "BAY-05-B-11",
    sku: "COK-LAT-355",
    skuName: "Coca-Cola Lata 355ml",
    quantity: 800,
    status: 30,
    lotDate: "2024-01-20",
    expirationDate: "2025-07-20",
    location: "BAY-05-B-11",
    arrivalTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    occupancy: 72,
  },
];

// FEFO picking waves — oldest lot (by expirationDate) should be picked first
export interface PickingItem {
  sscc: string;
  sku: string;
  skuName: string;
  location: string;
  quantity: number;
  expirationDate: string;
  lotDate: string;
  isFEFOSuggested: boolean; // set by algorithm — oldest/nearest to expire
}

export interface PickingWave {
  waveId: string;
  client: string;
  orderRef: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETE' | 'DISPATCH_READY';
  items: PickingItem[];
}

export const MOCK_PICKING_WAVES: PickingWave[] = [
  {
    waveId: "WAV-102",
    client: "Nestlé México S.A. de C.V.",
    orderRef: "ORD-NEX-40021",
    status: 'IN_PROGRESS',
    items: [
      // FEFO: BAY-05-B-11 expires 2025-07-20 (oldest) — must be picked first
      {
        sscc: "003758291000185400",
        sku: "COK-LAT-355",
        skuName: "Coca-Cola Lata 355ml",
        location: "BAY-05-B-11",
        quantity: 100,
        expirationDate: "2025-07-20",
        lotDate: "2024-01-20",
        isFEFOSuggested: true,
      },
      // This lot expires later — picking it first would violate FEFO
      {
        sscc: "003758291000185100",
        sku: "COK-LAT-355",
        skuName: "Coca-Cola Lata 355ml",
        location: "BAY-01-B-05",
        quantity: 100,
        expirationDate: "2025-08-18",
        lotDate: "2024-02-18",
        isFEFOSuggested: false,
      },
    ],
  },
];



export const MOCK_ALERTS = [
  {
    id: "ALR-001",
    type: "CRITICAL",
    title: "Anomalía NOM-251 Detectada",
    description: "Paquete dañado reportado en Bahía 04-A-12. Bloqueo SSCC ejecutado.",
    timestamp: "Hace 2 min",
    module: "Calidad",
  },
  {
    id: "ALR-002",
    type: "WARNING",
    title: "Retraso en Carga",
    description: "Andén 03: Transporte TRP-EST-12 excede tiempo de estadía (2h+).",
    timestamp: "Hace 15 min",
    module: "Expedición",
  },
];

export const MOCK_OPERATIONAL_KPIs = {
  receptionTotal: 450,
  qualityTotal: 12,
  inventoryOcupation: "82.4%",
  expeditionToday: 154,
};

export interface HistoryLogItem {
  id: number;
  title: string;
  time: string;
  date: string;
  user: string;
  active?: boolean;
}

export interface QualityIncident {
  folio: string;
  status: string;
  severity: string;
  sku: string;
  skuName: string;
  location: string;
  locationDetail: string;
  reportedBy: string;
  role: string;
  timestamp: string;
  description: string;
  history?: HistoryLogItem[];
}

export const MOCK_DETAILED_INCIDENTS: Record<string, QualityIncident> = {
  "QM-8821": {
    folio: "QM-8821",
    status: "BLOQUEADO",
    severity: "CRITICAL",
    sku: "NES-200-CLAS",
    skuName: "Nescafé Clásico 200g",
    location: "04-A-12",
    locationDetail: "Pasillo Central Norte",
    reportedBy: "Ing. Roberto Méndez",
    role: "Quality Control Specialist",
    timestamp: "20-MAR-2024 14:35:44 CST",
    description: "Se detectó durante la inspección rutinaria de andén que el pallet con SSCC 003758291000184729 presenta humedad excesiva en la base y ruptura de empaque primario. El producto está comprometido bajo la norma NOM-251 de inocuidad alimentaria.",
    history: [
      { id: 1, title: "Folio Generado", time: "14:35", date: "Hoy", user: "RM", active: true },
      { id: 2, title: "Notificación Enviada", time: "14:36", date: "Hoy", user: "SYS" },
      { id: 3, title: "Bloqueo en Inventario", time: "14:38", date: "Hoy", user: "VALT" },
    ]
  },
  "QM-8822": {
    folio: "QM-8822",
    status: "INVESTIGACIÓN",
    severity: "WARNING",
    sku: "AD-GL-992",
    skuName: "Gazelle OG - Light 27",
    location: "02-C-07",
    locationDetail: "Sector Alpha Reserva",
    reportedBy: "Supervisor Ana L.",
    role: "Warehouse Supervisor",
    timestamp: "20-MAR-2024 16:10:12 CST",
    description: "Discrepancia detectada durante el conteo cíclico. El sistema reporta 500 unidades, el físico muestra 480 con empaque secundario alterado.",
    history: [
      { id: 1, title: "Discrepancia Reportada", time: "16:10", date: "Hoy", user: "AL", active: true },
      { id: 2, title: "Bloqueo Preventivo", time: "16:15", date: "Hoy", user: "VALT" },
    ]
  },
  "QM-1229": {
    folio: "QM-1229",
    status: "BLOQUEADO",
    severity: "CRITICAL",
    sku: "NES-200-CLAS",
    skuName: "Nescafé Clásico 200g",
    location: "04-A-12",
    locationDetail: "Pasillo Central Norte",
    reportedBy: "Ing. Roberto Méndez",
    role: "Quality Control Specialist",
    timestamp: "20-MAR-2024 14:35:44 CST",
    description: "Se detectó durante la inspección rutinaria de andén que el pallet con SSCC 003758291000184729 presenta humedad excesiva en la base y ruptura de empaque primario. El producto está comprometido bajo la norma NOM-251 de inocuidad alimentaria.",
    history: [
      { id: 1, title: "Folio Generado", time: "14:35", date: "Hoy", user: "RM", active: true },
      { id: 2, title: "Notificación Enviada", time: "14:36", date: "Hoy", user: "SYS" },
      { id: 3, title: "Bloqueo en Inventario", time: "14:38", date: "Hoy", user: "VALT" },
    ]
  }
};
