export const MOCK_INVENTORY = [
  { id: "BAY-04-A-12", sku: "NES-CLA-200", quantity: 450, status: "LOCKED", reason: "NOM-251" },
  { id: "BAY-04-A-13", sku: "DOG-CHO-4KG", quantity: 120, status: "AVAILABLE" },
  { id: "BAY-01-B-05", sku: "COK-LAT-355", quantity: 2000, status: "AVAILABLE" },
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
