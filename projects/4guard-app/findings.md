# Findings: Revisión de stitch_src y 4guard-app

## stitch_src - Pantallas Implementadas (20)

| Pantalla | Archivo | Correspondencia spec |
|----------|---------|---------------------|
| Login | `inicio_de_sesi_n_login_01` | Pantalla 0 (Login) |
| Dashboard KPIs | `dashboard_de_kpis_dash_01` | Pantalla 1: Dashboard |
| Recepción Meta | `consola_de_recepci_n_paso_1_metadatos_rec_01` | Pantalla 2: REC-01 Paso 1 |
| Recepción Unificada | `consola_de_recepci_n_unificada_rec_02` | Pantalla 2: REC-02 |
| Módulo Calidad | `m_dulo_de_calidad_qm_01` | Pantalla 5: QM |
| Lista Incidencias | `lista_de_incidencias_de_calidad_qm_01` | Pantalla 5 |
| Picking RF | `tarea_de_picking_rf_02` | Terminal Móvil |
| Expedición | `consola_de_expedici_n_y_ruteo_exp_01` | Pantalla 3: EXP-01 |
| Inventario 2D | `inventario_2d_topolog_a_inv_01` | Pantalla 4: INV-01 |
| Auditoría | `auditor_a_e_inteligencia_aud_01` | Pantalla 7 |
| Etiquetado | `administrador_de_etiquetado_sscc` | Pantalla 6 |
| Panel Alertas | `panel_de_alertas_glob_01` | Transversal |

## 4guard-app - Estado Actual

### Rutas
- `/` - Dashboard (Torre de Control)
- `/reception` - Recepción (buffer, scan)
- `/quality` - Calidad (incidencias)
- `/inventory` - Inventario 2D
- `/expedition` - Expedición (picking)
- `/etiquetado` - Etiquetado SSCC
- `/audit` - Auditoría
- `/rf/tareas` - Menú RF
- `/rf/picking/[taskId]` - Picking móvil
- `/rf/anomalia` - Reporte anomalías

### Store Actual
```typescript
// useAppStore.ts
userRole: "OPERATOR" | "SUPERVISOR" | "INSPECTOR" | "MANAGER" | "AUDITOR"

// store.ts (auth)
user: { name: string; role: string }
```

### Problema Identificado
- No existe componente de selección de rol
- Navegación muestra todas las opciones sin filtrar por RBAC
- Las pantallas de stitch_src son HTML estáticos - no hay forma de integrarlos dinámicamente

### Solución Requerida
1. Crear RoleSelector component
2. Modificar Shell para filtrar navItems por rol
3. Agregar lógica de permisos
4. Persistir selección en localStorage
