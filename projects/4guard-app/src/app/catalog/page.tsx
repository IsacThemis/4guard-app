"use client";

import React, { useState } from "react";
import Shell from "@/components/layout/Shell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RoleGuard from "@/components/auth/RoleGuard";
import { 
  Users,
  Truck,
  Package,
  Warehouse,
  HardHat,
  Trash2,
  RotateCcw,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye
} from "lucide-react";
import { clsx } from "clsx";

type TabType = "usuarios" | "clientes" | "productos" | "almacen" | "montacarguistas" | "papelera";

interface BaseItem {
  id: string;
  name: string;
  status: "active" | "deleted";
  deletedAt?: string;
}

interface User extends BaseItem {
  email: string;
  role: string;
  lastActive: string;
}

interface Client extends BaseItem {
  rfc: string;
  contact: string;
  phone: string;
}

interface Product extends BaseItem {
  sku: string;
  category: string;
  stock: number;
}

interface WarehouseLocation extends BaseItem {
  zone: string;
  capacity: number;
  occupied: number;
}

interface ForkliftOperator extends BaseItem {
  license: string;
  shift: string;
  certifications: string[];
}

const mockUsers: User[] = [
  { id: "1", name: "Ing. Roberto Martínez", email: "roberto@4guard.com", role: "SUPERVISOR", status: "active", lastActive: "Ahora" },
  { id: "2", name: "Lic. Ana García", email: "ana@4guard.com", role: "MANAGER", status: "active", lastActive: "Hace 2h" },
  { id: "3", name: "Juan Pérez", email: "juan.p@4guard.com", role: "OPERATOR", status: "active", lastActive: "Hace 30min" },
  { id: "4", name: "María López", email: "maria.l@4guard.com", role: "INSPECTOR", status: "deleted", deletedAt: "2026-03-20", lastActive: "Hace 5 días" },
];

const mockClients: Client[] = [
  { id: "1", name: "Coca-Cola FEMSA", rfc: "CMM-940215-ABC", contact: "Carlos Mendoza", phone: "55-1234-5678", status: "active" },
  { id: "2", name: "PepsiCo México", rfc: "PMX-880112-XYZ", contact: "Laura Hernández", phone: "55-8765-4321", status: "active" },
  { id: "3", name: "Grupo Bimbo", rfc: "GBM-420506-MNO", contact: "Pedro Sánchez", phone: "55-5555-5555", status: "deleted", deletedAt: "2026-03-18" },
];

const mockProducts: Product[] = [
  { id: "1", name: "Nescafé Clásico 200g", sku: "NES-CLA-200", category: "Bebidas", stock: 1200, status: "active" },
  { id: "2", name: "Dog Chow Adulto 4kg", sku: "DOG-CHO-4KG", category: "Mascotas", stock: 450, status: "active" },
  { id: "3", name: "Coca Cola Lata 355ml", sku: "COK-LAT-355", category: "Bebidas", stock: 5000, status: "active" },
  { id: "4", name: "Sabmiles Original", sku: "SAB-ORI-500", category: "Galletas", stock: 0, status: "deleted", deletedAt: "2026-03-15" },
];

const mockWarehouses: WarehouseLocation[] = [
  { id: "1", name: "Zona A - Pallets", zone: "A", capacity: 500, occupied: 423, status: "active" },
  { id: "2", name: "Zona B - Rack", zone: "B", capacity: 1000, occupied: 876, status: "active" },
  { id: "3", name: "Zona C - Temperatura", zone: "C", capacity: 200, occupied: 180, status: "active" },
  { id: "4", name: "Zona D - Antiguo", zone: "D", capacity: 300, occupied: 0, status: "deleted", deletedAt: "2026-01-10" },
];

const mockOperators: ForkliftOperator[] = [
  { id: "1", name: "José Luis Hernández", license: "OP-001234", shift: "Matutino", certifications: ["Operador certificado", "Seguridad"], status: "active" },
  { id: "2", name: "Miguel Ángel Torres", license: "OP-001235", shift: "Vespertino", certifications: ["Operador certificado"], status: "active" },
  { id: "3", name: "Francisco García", license: "OP-001236", shift: "Matutino", certifications: ["Operador certificado", "Carga peligrosas"], status: "deleted", deletedAt: "2026-03-22" },
];

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<TabType>("usuarios");
  const [showTrash, setShowTrash] = useState(false);
  
  const tabs = [
    { id: "usuarios" as TabType, label: "Usuarios", icon: Users },
    { id: "clientes" as TabType, label: "Clientes", icon: Truck },
    { id: "productos" as TabType, label: "Productos", icon: Package },
    { id: "almacen" as TabType, label: "Almacén", icon: Warehouse },
    { id: "montacarguistas" as TabType, label: "Montacarguistas", icon: HardHat },
  ];

  const getTrashCount = () => {
    return mockUsers.filter(u => u.status === "deleted").length +
           mockClients.filter(c => c.status === "deleted").length +
           mockProducts.filter(p => p.status === "deleted").length +
           mockWarehouses.filter(w => w.status === "deleted").length +
           mockOperators.filter(o => o.status === "deleted").length;
  };

  return (
    <RoleGuard allowedRoles={["MANAGER"]}>
    <Shell>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Catálogo</h1>
            <p className="text-slate-500 mt-1 font-medium">Gestión de recursos — CAT-01</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowTrash(false); }}
                className={clsx(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id && !showTrash
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
            <div className="flex-1"></div>
            <button
              onClick={() => setShowTrash(true)}
              className={clsx(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                showTrash
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <Trash2 className="w-4 h-4" />
              Papelera
              {getTrashCount() > 0 && (
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                  {getTrashCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {!showTrash ? (
          activeTab === "usuarios" && <UsersList users={mockUsers.filter(u => u.status === "active")} />
        ) : (
          <TrashBin />
        )}

        {activeTab === "clientes" && !showTrash && <ClientsList clients={mockClients.filter(c => c.status === "active")} />}
        {activeTab === "productos" && !showTrash && <ProductsList products={mockProducts.filter(p => p.status === "active")} />}
        {activeTab === "almacen" && !showTrash && <WarehouseList warehouses={mockWarehouses.filter(w => w.status === "active")} />}
        {activeTab === "montacarguistas" && !showTrash && <OperatorsList operators={mockOperators.filter(o => o.status === "active")} />}

      </div>
    </Shell>
    </RoleGuard>
  );
}

function TrashBin() {
  const allDeleted = [
    ...mockUsers.filter(u => u.status === "deleted").map(u => ({ ...u, type: "Usuario" })),
    ...mockClients.filter(c => c.status === "deleted").map(c => ({ ...c, type: "Cliente" })),
    ...mockProducts.filter(p => p.status === "deleted").map(p => ({ ...p, type: "Producto" })),
    ...mockWarehouses.filter(w => w.status === "deleted").map(w => ({ ...w, type: "Ubicación" })),
    ...mockOperators.filter(o => o.status === "deleted").map(o => ({ ...o, type: "Operador" })),
  ];

  return (
    <Card noPadding className="overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-red-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Papelera de Reciclaje</h3>
            <p className="text-sm text-slate-500">Elementos eliminados. Restaura antes de 30 días.</p>
          </div>
        </div>
      </div>
      
      {allDeleted.length === 0 ? (
        <div className="p-12 text-center">
          <Trash2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">La papelera está vacía</p>
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Eliminado</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allDeleted.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">{item.type}</span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.deletedAt}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Restaurar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function UsersList({ users }: { users: User[] }) {
  return (
    <Card noPadding className="overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Último acceso</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{user.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-slate-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">{user.role}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{user.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ClientsList({ clients }: { clients: Client[] }) {
  return (
    <Card noPadding className="overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">RFC</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{client.name}</td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600">{client.rfc}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{client.contact}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{client.phone}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ProductsList({ products }: { products: Product[] }) {
  return (
    <Card noPadding className="overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                <td className="px-6 py-4 font-mono text-sm text-primary">{product.sku}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "text-sm font-medium",
                    product.stock === 0 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-green-600"
                  )}>
                    {product.stock.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function WarehouseList({ warehouses }: { warehouses: WarehouseLocation[] }) {
  return (
    <Card noPadding className="overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Zona</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Capacidad</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Ocupación</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {warehouses.map((wh) => {
              const occupancyPercent = Math.round((wh.occupied / wh.capacity) * 100);
              return (
                <tr key={wh.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{wh.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">{wh.zone}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{wh.capacity} pallets</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={clsx(
                            "h-full rounded-full",
                            occupancyPercent > 90 ? "bg-red-500" : occupancyPercent > 70 ? "bg-amber-500" : "bg-green-500"
                          )}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{occupancyPercent}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function OperatorsList({ operators }: { operators: ForkliftOperator[] }) {
  return (
    <Card noPadding className="overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Operador</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Licencia</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Turno</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Certificaciones</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {operators.map((op) => (
              <tr key={op.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <HardHat className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="font-medium text-slate-800">{op.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600">{op.license}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{op.shift}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {op.certifications.map((cert, i) => (
                      <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{cert}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
