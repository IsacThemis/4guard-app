# 4-GUARD WMS - End-to-End Flows

## Architecture Overview

### Roles & Permissions

| Role | Access Level | Modules |
|------|--------------|---------|
| **OPERATOR** | Terminal Móvil RF | RF Tasks, Picking, Anomalies, Settings |
| **SUPERVISOR** | Lider de Turno | Reception, Quality, Inventory, Expedition, Labeling, Audit |
| **INSPECTOR** | Calidad NOM-251 | Quality, Incidences, Inventory, Audit |
| **MANAGER** | Operaciones | Reception, Quality, Inventory, Expedition, Labeling, Audit |
| **AUDITOR** | Cumplimiento | Audit Only |

---

## Role Walkthroughs

### 1. OPERATOR (Terminal RF)

**Access:** `/rf` - Mobile-optimized interface

#### Flow: Picking Task

```
1. Login → Select OPERATOR role
2. View Task Menu (/rf/tareas)
   - See assigned tasks
   - Primary: Picking consolidated (HIGH PRIORITY)
   - Secondary: Stowing arrival
3. Select Picking Task → /rf/picking/[waveId]
   - Scan SSCC/Barcode
   - Confirm quantity picked
   - Move to next location
4. Complete task → Return to menu
5. FAB Button → Report Anomaly (/rf/anomalia)
   - Select anomaly type
   - Enter details
   - Confirm (/rf/anomalia/confirm)
```

#### Flow: Report Anomaly

```
1. Tap red FAB button (AlertTriangle)
2. Select anomaly type:
   - Product damaged
   - Label illegible
   - Quantity mismatch
   - Location blocked
   - Other
3. Enter description
4. Confirm → /rf/anomalia/confirm
5. Return to task menu
```

---

### 2. SUPERVISOR

**Access:** Dashboard + All operational modules

#### Flow: Reception (REC-01)

```
1. Navigate to Reception (/reception)
2. Step 0: Metadata
   - Enter license plates
   - Select carrier
   - Enter driver name
   - Enter security seal
3. Step 1: ASN Validation (Folio 10)
   - Enter ASN/PO number
   - Validate document
4. Step 2: Blind Crossing (Folio 20)
   - Enter received quantities
   - Calculate quadrature
   - Check for deviations
5. Step 3: Closure (Folio 30)
   - ONLY if 100% quadrature
   - Confirm closure
   - Generate report
```

#### Flow: Reception Console (REC-02)

```
1. Navigate to Console (/reception/console)
2. View:
   - Global quadrature gauge
   - Active receptions by status
   - Search by ASN/plates
3. Select reception → View details
4. Monitor progress in real-time
```

#### Flow: Quality Control

```
1. Navigate to Quality (/quality)
2. View KPIs:
   - Incidences by type
   - Compliance rate
3. Create Incidence (/quality/incidencias)
4. View/Edit Incidence Details
```

---

### 3. INSPECTOR

**Access:** Quality-focused with audit capabilities

#### Flow: Quality Inspection

```
1. Navigate to Quality (/quality)
2. View Quality Dashboard
3. Access Incidences (/quality/incidencias)
4. Create/Review incidence:
   - Select type
   - Enter SKU/SSCC
   - Document issue
   - Assign severity
5. Resolution workflow
6. Generate compliance report
```

---

### 4. MANAGER

**Access:** Full operational view + strategic

#### Flow: Expedition Management (EXP-05)

```
1. Navigate to Expedition (/expedition)
2. View KPIs:
   - Pending orders
   - Lines in picking
   - Load delays
   - Fill rate
3. Dock Management (/expedition - DockManager)
   - Drag & drop dock assignment
   - Monitor dock status
4. View Active Waves
   - Wave picking progress
   - Release new waves
5. Select Wave → Picking Details
   - View picking list
   - Monitor progress
```

#### Flow: Inventory

```
1. Navigate to Inventory (/inventory)
2. View:
   - Stock levels by location
   - Topology visualization
   - Search by SKU/SSCC/Lot
3. Monitor capacity
```

---

### 5. AUDITOR

**Access:** Audit & Compliance (AUD-06)

#### Flow: Audit Trail

```
1. Navigate to Audit (/audit)
2. View:
   - Critical events (24h)
   - Restricted accesses
   - NOM-251 compliance
3. View Immutable Log Table:
   - Real-time blockchain logging
   - Filter by event type
   - Filter by risk level
4. Search by:
   - Timestamp
   - Actor/Terminal
   - Object ID
5. Export SHA-256 hash
6. View CCTV Integration (placeholder)
7. View Incident Heatmap (placeholder)
```

---

## Module Summary

| Module | Path | Purpose | Key Features |
|--------|------|---------|--------------|
| **Dashboard** | `/` | Role-based overview | KPIs, role-specific views |
| **Reception** | `/reception` | Incoming goods | 4-step flow, ASN validation |
| **Reception Console** | `/reception/console` | Unified monitoring | Global quadrature, active units |
| **Reception Buffer** | `/reception/buffer` | Buffer management | SSCC table, search |
| **Reception Scan** | `/reception/scan` | RF scanning | Mobile-optimized |
| **Expedition** | `/expedition` | Outgoing goods | Dock manager, wave picking |
| **Picking** | `/expedition/picking/[waveId]` | Picking execution | Line-by-line picking |
| **Quality** | `/quality` | Quality control | KPIs, incidence management |
| **Incidences** | `/quality/incidencias` | Issue tracking | Create, view, resolve |
| **Inventory** | `/inventory` | Stock management | Topology, search |
| **Labeling** | `/etiquetado` | Label printing | SSCC generation, print |
| **Audit** | `/audit` | Compliance | Blockchain logging, CCTV |
| **RF Tasks** | `/rf/tareas` | Operator tasks | Task menu |
| **RF Picking** | `/rf/picking/[taskId]` | Picking execution | Mobile picking |
| **RF Anomaly** | `/rf/anomalia` | Issue reporting | Anomaly types, details |
| **Settings** | `/settings` | User preferences | Profile, notifications, security |
| **Login** | `/login` | Authentication | Role selection |

---

## Navigation Flow

```
Login (/login)
    ↓
Select Role → Dashboard (/)
    ↓
┌─────────────────────────────────────────────────────┐
│ Sidebar Navigation                                   │
│ ├─ Dashboard (/)                                     │
│ ├─ Reception (/reception)                          │
│ │   ├─ Console (/reception/console)               │
│ │   ├─ Buffer (/reception/buffer)                  │
│ │   └─ Scan (/reception/scan)                     │
│ ├─ Expedition (/expedition)                        │
│ │   └─ Picking (/expedition/picking/[waveId])     │
│ ├─ Quality (/quality)                              │
│ │   └─ Incidences (/quality/incidencias)         │
│ ├─ Inventory (/inventory)                          │
│ ├─ Labeling (/etiquetado)                         │
│ ├─ Audit (/audit)                                  │
│ └─ RF (/rf) → Mobile-optimized                    │
│     ├─ Tasks (/rf/tareas)                         │
│     ├─ Picking (/rf/picking/[taskId])             │
│     └─ Anomaly (/rf/anomalia)                     │
└─────────────────────────────────────────────────────┘
    ↓
Settings (/settings) ← Top-right user menu
Logout → Login (/login)
```

---

## Design Tokens

### Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--primary` | `#1a237e` | `#818cf8` |
| `--primary-container` | `#312e81` | `#4f46e5` |
| `--secondary` | `#bb0112` | `#f87171` |
| `--accent` | `#f97316` | `#fb923c` |
| `--success` | `#059669` | `#34d399` |
| `--warning` | `#d97706` | `#fbbf24` |
| `--error` | `#dc2626` | `#f87171` |
| `--background` | `#f7fafc` | `#020617` |
| `--foreground` | `#181c1e` | `#f8fafc` |

### Typography

- **Headings:** Work Sans (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Code/Data:** Fira Code (Google Fonts)

### Effects

- **Liquid Glass:** `backdrop-filter: blur(16px) saturate(180%)`
- **Page Transitions:** 200ms ease-out with Framer Motion
- **Hover States:** 150-300ms transitions
- **Spring Animations:** Physics-based with Framer Motion

---

## Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + CSS Variables
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion + React Spring
- **Icons:** Lucide React
- **Charts:** Recharts
- **RF Layout:** Mobile-optimized with touch targets
