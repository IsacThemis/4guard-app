**Documento Maestro: Especificaciones Funcionales y UX/UI**

**Proyecto:** Ecosistema WMS Inteligente 4.0 (Plataforma 4-GUARD)  
**Versión:** 6.0 (MVP 2D Integrado \+ User Flows \+ Alertas y Reportes)  
**Audiencia:** Equipo de Diseño (Figma), Desarrollo Front-End, Arquitectura Backend.

---

**1\. Sistema de Diseño e Identidad de Marca (4-GUARD)**

La identidad visual extraída del imagotipo "4-GUARD" dicta la psicología de la interacción. El sistema debe transmitir seguridad, inmutabilidad y control absoluto (concepto de "Bóveda").

**1.1 Paleta de Colores y su Aplicación Sistémica**

* **Azul Naval Profundo (Color Base / Autoridad):** Uso en navegación global (Sidebars, Topbars), tipografía principal y contenedores maestros. Reduce la fatiga visual en turnos operativos de 8+ horas.

* **Rojo Vibrante (Color Crítico / Acción Inmediata):** NO usar para botones primarios comunes. Reservado estrictamente para:

  * Alertas de discrepancia volumétrica (Descuadres).

  * Bloqueos sanitarios algorítmicos (NOM-251) y Cuarentenas.

  * Botones de alteración histórica o eliminación lógica.

  * Alertas críticas escaladas (notificaciones de alta prioridad).

* **Blanco Puro y Grises Claros (Lienzo / Claridad):** Fondos de tarjetas de información (Cards) y tablas de datos para maximizar el contraste alfanumérico (lectura de SSCCs, placas, lotes).

**1.2 Principio UX: "La Bóveda Estructurada"**

Basado en la envoltura circular y el "techo" del logo, la interfaz evitará los flujos libres o "lienzos infinitos". Los procesos críticos (Recepción, Despacho, Calidad) se diseñarán como asistentes paso a paso (Wizards) rígidamente estructurados que encapsulen al usuario, impidiendo avanzar si no se cumplen las reglas de negocio (ej. cuadratura volumétrica).

---

**2\. Perfiles de Usuario (Roles / RBAC)**

1. **Operador / Montacarguista (Terminal Móvil RF / Edge):** Interfaz hiper-simplificada (botones masivos, alto contraste). Tareas guiadas. Permisos de solo registro.

2. **Líder de Turno / Supervisor (Desktop/Tablet):** Gestiona el andén, aprueba discrepancias, monitorea la "Máquina de Estados", genera listas de picking, y recibe escalaciones de alertas.

3. **Inspector de Calidad (Desktop/Tablet):** Perfil blindado. Único rol autorizado para aplicar/levantar el "Rojo Vibrante" (Bloqueos NOM-251) y aprobar cuarentenas lógicas (Status 20).

4. **Gerente de Operaciones (Desktop):** Perfil analítico. Consume Dashboards de KPIs, interactúa con el Copiloto AI, exporta reportes financieros y gestiona el mapa 2D.

5. **Auditor / Cumplimiento (Desktop):** Acceso de solo lectura a los Audit Trails inmutables y reportes de trazabilidad (para SAT/Nestlé).

---

**3\. Arquitectura del Sistema y Mapa de Módulos (MVP)**

El ecosistema fusiona los módulos Legacy evolucionados con las nuevas innovaciones del 4.0.

**3.1 Módulo Transversal (El Sistema Nervioso) \- NUEVO**

* **Motor de Alertas y Notificaciones Proactivas:** Workflows que detectan cuellos de botella, envían recordatorios por inactividad (15 min), escalan bloqueos a supervisores (\> 2 horas en Status 20), y notifican eventos críticos en tiempo real.

* **Generador de Reportes Contextuales:** Motor de exportación (PDF/Excel) integrado de forma nativa en cada pantalla administrativa, restringido por RBAC. Cada módulo tendrá botones contextuales de exportación.


**3.2 Consola Web Administrativa**

* **Módulo de Dashboard / KPIs (Nuevo):** Torre de control con indicadores en tiempo real.

* **Módulo de Recepción (Legacy Evolucionado):** "La Bóveda" de captura de andén y cuadratura.

* **Módulo de Expedición y Salidas (Legacy Evolucionado):** Consola de enrutamiento y despacho (PEPS/FEFO).

* **Módulo de Inventario 2D (Nuevo):** Topología cromática en vista de planta y Máquina de Estados (10, 20, 30).

* **Módulo de Calidad NOM-251 (Nuevo):** Panel de cuarentenas y bloqueos algorítmicos.

* **Módulo de Etiquetado y Catálogos (Legacy Evolucionado):** Gestión de SSCC (GS1-128), impresiones y Soft Deletes.

* **Auditoría e Inteligencia (Nuevo):** Copiloto S\&OP AI y Audit Trail.

**3.3 Terminal Móvil (Operadores)**

* **Menú de Tareas:** \[📥 Recepción\], \[📤 Acomodo (Put-away)\], \[📦 Picking (Salida)\].

* **Escáner Activo:** Input RF y pantallas de Alerta/Bloqueo.

---

**4\. Flujos Funcionales End-to-End (Narrativa Operativa)**

**Flujo 1: Recepción, Máquina de Estados (El Buffer) y Escalación de Alerta**

1. **Bóveda de Entrada:** Supervisor inicia Recepción. Exige Metadatos de Seguridad (Placas, Chofer, Sellos).

2. **Cuadratura:** Operador escanea pallets. Un componente radial compara Escaneado vs Esperado. Botón de cierre deshabilitado si no hay cuadratura perfecta.

3. **Pausa Operativa (Alerta Amarilla):** El capturista deja la pantalla inactiva por 15 min. El sistema le lanza un modal: "Llevas 15 min sin cerrar la recepción. Finaliza la captura."

4. **Timer 30 min superado:** El sistema escala la notificación al Supervisor vía Badge de Campana.

5. **Status 10 (Andén):** Pallets nacen en Status 10 (inmovilizados lógicamente).

6. **Status 20 (Bolsa):** Se imprimen etiquetas locales. Pasan a Status 20 (Esperando Cliente). El sistema prohíbe tareas de acomodo hasta validación externa.

7. **Cuello de Botella (Alerta Roja):** Si pasan más de 2 horas en Status 20, el sistema alerta a Calidad/Supervisor: "Tienes 3 lotes bloqueados hace más de 2h".

8. **Status 30 (Liberado):** Nestlé valida (manual o vía EDI). El lote muta a Status 30 (Verde \- Liberado). Se dispara orden de acomodo al terminal del operador.

**Flujo 2: Expedición Estricta (Algoritmo PEPS/FEFO) y Reporte**

1. **Orden de Salida:** Supervisor crea "Manifiesto de Salida" para el Cliente X.

2. **Asignación Algorítmica:** El sistema busca el inventario disponible (Solo Status 30 y No bloqueado). Fuerza la selección de los pallets más antiguos (PEPS) o próximos a caducar (FEFO).

3. **Tarea Móvil:** El Operador recibe la lista de picking guiada: "Ve a Bahía B-12 y escanea SSCC-8901".

4. **Bloqueo de Error:** Si el Operador intenta escanear un pallet más nuevo por pereza (está más cerca), la terminal emite chicharra y bloquea: "❌ Error FEFO: Existe un lote más antiguo que debe salir primero".

5. **Despacho Parcial:** Si el cliente pide 5 pallets de una remisión original de 20, el sistema fracciona el lote, despacha 5 y deja 15 anclados a la remisión origen.

6. **Cierre y Reporte:** Supervisor cierra la orden y el sistema genera automáticamente la "Remisión de Salida PDF" con sellos de tiempo, SSCCs despachados y firmas digitales.

**Flujo 3: Bloqueo de Calidad (NOM-251) y Trazabilidad**

1. **Detección:** Inspector detecta contaminación cruzada o empaque roto.

2. **Bloqueo en UI:** Accede al Módulo QM. Selecciona el Lote/SSCC. Usa la acción primaria \[Bloquear Lote\]. El sistema exige un Motivo y un Soporte Documental adjunto.

3. **Propagación Sistémica (Color Rojo):** El Lote adquiere el "Rojo Vibrante 4-GUARD". Su estado lógico es Quarantine. El mapa 2D muestra alerta. Consola de Expedición deshabilita el SSCC.

4. **Intercepción de Acción:** Un montacarguista, con una orden previa de picking fraccionado, intenta escanear el pallet rojo.

5. **Rechazo en el Borde (Edge):** La terminal RF móvil del montacarguista emite alerta sonora y despliega pantalla roja: "⛔ ACCESO DENEGADO. Lote Bloqueado por Calidad. Retire unidad a zona de merma."

6. **Reporte (Recall):** Ante una auditoría de Secretaría de Salud, el Inspector presiona \[Generar Sábana de Trazabilidad\] exportando el rastro histórico inviolable (PDF blindado con sellos de tiempo, camiones y origen/destino).

---

**5\. Flujos de Usuario por Módulo (Screen-by-Screen)**

Esta sección detalla la secuencia exacta de clics e interacciones para el equipo de UX/UI y diseño de prototipos en Figma.

**5.1 Recepción \+ Máquina de Estados (10/20/30)**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Supervisor hace clic en tarjeta/menú "Recepción"  
   **↳ Destino:** Consola de Recepción ("La Bóveda") – Paso 1 Metadatos

2. **Pantalla Origen:** Consola de Recepción – Paso 1 Metadatos  
   **↳ Acción:** Supervisor captura Placas, Chofer, Sellos y guarda  
   **↳ Destino:** Consola de Recepción – Paso 2 Escaneo (habilita escáner RF)

3. **Pantalla Origen:** Consola de Recepción – Paso 2 Escaneo  
   **↳ Acción:** Operador escanea primer pallet (SSCC)  
   **↳ Destino:** Consola de Recepción – Cuadratura actualizada (Gráfico radial y tabla buffer, pallet en Status 10\)

4. **Pantalla Origen:** Consola de Recepción – Cuadratura  
   **↳ Acción:** Sistema genera SSCC interno y asigna Status 10 (Andén) para cada pallet  
   **↳ Destino:** Consola de Recepción – Tabla Buffer con filas en Gris \[Status 10\]

5. **Pantalla Origen:** Consola de Recepción – Tabla Buffer  
   **↳ Acción:** Supervisor dispara impresión de etiquetas locales ("Generar etiquetas")  
   **↳ Destino:** Consola de Recepción – Tabla Buffer actualizada (pallets pasan a Status 20 "Bolsa")

6. **Pantalla Origen:** Consola de Recepción – Tabla Buffer (Status 20\)  
   **↳ Acción:** Supervisor intenta asignar tarea de acomodo a un pallet en Status 20  
   **↳ Destino:** Acción bloqueada (UI deshabilita "Mover/Acomodo" para Status 20\)

7. **Pantalla Origen:** Consola de Recepción (Capturista inactivo por 15 min)  
   **↳ Acción:** Timer de inactividad dispara modal  
   **↳ Destino:** Pantalla actual oscurecida con Modal de Advertencia Amarilla: "Llevas 15 min sin cerrar. Finaliza la captura."

8. **Pantalla Origen:** Timer 30 min superado  
   **↳ Acción:** El sistema escala la notificación en background  
   **↳ Destino:** Dashboard del Supervisor – Badge de Campana marca \[1\]

9. **Pantalla Origen:** Dashboard (Supervisor)  
   **↳ Acción:** Supervisor hace clic en Campana → Clic en "Alerta: Andén 11 detenido"  
   **↳ Destino:** Consola de Recepción, mostrando los datos faltantes para tomar acción

10. **Pantalla Origen:** Backend / Consola de Recepción  
    **↳ Acción:** Llega validación Nestlé (manual o vía EDI)  
    **↳ Destino:** Consola de Recepción / Inventario 2D – pallets actualizados a Status 30 (Verde/Liberado)

11. **Pantalla Origen:** Consola de Recepción – Cuadratura  
    **↳ Acción:** Operador termina de escanear todos los pallets; Escaneados \== Esperados  
    **↳ Destino:** Consola de Recepción – Botón \[Cerrar Recepción Definitiva\] habilitado visualmente

12. **Pantalla Origen:** Consola de Recepción  
    **↳ Acción:** Supervisor hace clic en \[Cerrar Recepción Definitiva\]  
    **↳ Destino:** Modal de Confirmación → Dashboard de KPIs actualizado \+ Botón \[📄 Generar Manifiesto de Ingreso (PDF)\] disponible

**5.2 Expedición y Salidas (PEPS/FEFO)**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Supervisor hace clic en módulo "Expedición / Salidas"  
   **↳ Destino:** Consola de Expedición y Ruteo

2. **Pantalla Origen:** Consola de Expedición y Ruteo  
   **↳ Acción:** Supervisor busca y selecciona una Orden de salida (ASN cliente)  
   **↳ Destino:** Detalle de Orden (sin SSCC asignados aún)

3. **Pantalla Origen:** Detalle de Orden de Salida  
   **↳ Acción:** Supervisor hace clic en \[Generar sugerencia PEPS/FEFO\]  
   **↳ Destino:** Tabla de Picking Sugerido autocompletada con SSCCs marcados \[FEFO Validado\]

4. **Pantalla Origen:** Detalle de Orden – Tabla de Picking  
   **↳ Acción:** Supervisor asigna Rampa de Salida y lanza tareas a operadores móviles  
   **↳ Destino:** Consola de Expedición (Estado "Tareas enviadas") \+ Terminal Móvil recibe tarea

5. **Pantalla Origen:** Terminal Móvil – Menú de Tareas  
   **↳ Acción:** Operador selecciona tarea de Picking correspondiente  
   **↳ Destino:** Terminal Móvil – Lista guiada de pallets a recoger

6. **Pantalla Origen:** Terminal Móvil – Lista guiada  
   **↳ Acción:** Operador escanea el SSCC correcto sugerido  
   **↳ Destino:** Terminal Móvil (Confirmación) \+ Consola de Expedición (Incremento en barra de carga)

7. **Pantalla Origen:** Terminal Móvil – Lista guiada  
   **↳ Acción:** Operador intenta escanear un SSCC que NO corresponde (viola FEFO/PEPS)  
   **↳ Destino:** Terminal Móvil – Pantalla ROJA completa con mensaje "Error FEFO: Existe un lote más antiguo". Bloqueo de avance.

8. **Pantalla Origen:** Consola de Expedición – Progreso de Carga  
   **↳ Acción:** Operador completa escaneo de todos los SSCC sugeridos  
   **↳ Destino:** Consola de Expedición – Progreso al 100%, estado "Lista para despacho"

9. **Pantalla Origen:** Consola de Expedición – Orden lista  
   **↳ Acción:** Supervisor confirma despacho / cierre de orden de salida  
   **↳ Destino:** Dashboard de KPIs actualizado \+ Sistema genera automáticamente \[📄 Remisión de Despacho PDF\]

**5.3 Inventario 2D (Topología Cromática)**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Gerente hace clic en tarjeta "Inventario 2D / Topología"  
   **↳ Destino:** Módulo de Inventario 2D – Topología Cromática

2. **Pantalla Origen:** Inventario 2D – Vista general  
   **↳ Acción:** Usuario aplica filtros (Cliente, rango vencimiento, zona)  
   **↳ Destino:** Inventario 2D – Grid filtrado con bahías coloreadas

3. **Pantalla Origen:** Inventario 2D – Grid  
   **↳ Acción:** Usuario hace clic en una bahía específica  
   **↳ Destino:** Inventario 2D – Drawer (Panel lateral) con lista de SSCCs y estados

4. **Pantalla Origen:** Drawer de Bahía  
   **↳ Acción:** Supervisor revisa lista y hace clic en un SSCC concreto  
   **↳ Destino:** Pantalla de Detalle de SSCC

5. **Pantalla Origen:** Detalle de SSCC  
   **↳ Acción:** Supervisor solicita reubicación/acomodo (si estado \!= 20 y \!= Bloqueado)  
   **↳ Destino:** Inventario 2D – Confirmación de reubicación y actualización visual de bahías

6. **Pantalla Origen:** Inventario 2D – Grid (Evento asíncrono)  
   **↳ Acción:** Inspector de Calidad aplica bloqueo a un SSCC  
   **↳ Destino:** Inventario 2D – Bahía afectada muestra borde ROJO vibrante con icono de candado 🔒

**5.4 Módulo de Calidad (NOM-251)**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Inspector hace clic en módulo "Calidad NOM-251"  
   **↳ Destino:** Módulo de Calidad – Lista de inventario sujeto a QM

2. **Pantalla Origen:** Módulo de Calidad – Lista  
   **↳ Acción:** Inspector busca por SSCC, lote o remisión  
   **↳ Destino:** Lista filtrada con lotes candidatos

3. **Pantalla Origen:** Lista filtrada  
   **↳ Acción:** Inspector selecciona un lote/SSCC  
   **↳ Destino:** Detalle de Lote/SSCC en QM

4. **Pantalla Origen:** Detalle de Lote/SSCC (QM)  
   **↳ Acción:** Inspector hace clic en \[Bloquear Lote\] (botón rojo)  
   **↳ Destino:** Modal de confirmación severa con inputs obligatorios (Causa, observaciones)

5. **Pantalla Origen:** Modal de Bloqueo  
   **↳ Acción:** Inspector llena inputs y confirma  
   **↳ Destino:** Detalle de Lote actualizado a BLOQUEADO (Rojo Vibrante) \+ registro en Audit Trail

6. **Pantalla Origen:** Módulo de Calidad – Lista  
   **↳ Acción:** Sistema propaga bloqueo  
   **↳ Destino:** Vistas actualizadas (Inventario 2D con borde rojo, Expedición deshabilita SSCC, Terminal Móvil bloquea escaneo)

7. **Pantalla Origen:** Módulo de Calidad – Detalle  
   **↳ Acción:** Auditor abre historial de decisiones sobre ese lote  
   **↳ Destino:** Timeline de cambios (cambios de estado, usuario, timestamp, motivo)

8. **Pantalla Origen:** Módulo de Calidad – Detalle de Lote (Inspector busca "Lote 99A" investigación)  
   **↳ Acción:** Inspector presiona \[📥 Generar Sábana de Trazabilidad\]  
   **↳ Destino:** El sistema abre previsualización del PDF con sellos de agua y metadatos inmutables

9. **Pantalla Origen:** Visor de PDF  
   **↳ Acción:** Inspector aprueba y exporta el archivo para enviarlo a COFEPRIS/Nestlé  
   **↳ Destino:** Descarga completada, registro en Audit Trail

**5.5 Dashboard de KPIs**

1. **Pantalla Origen:** Login / Home  
   **↳ Acción:** Usuario autenticado ingresa exitosamente  
   **↳ Destino:** Dashboard de KPIs (Torre de control)

2. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Gerente revisa gráficas (Gauge, barras, etc.) y hace clic en una "Alerta Crítica"  
   **↳ Destino:** Navegación al módulo correspondiente (ej. Consola de Recepción o Calidad)

3. **Pantalla Origen:** Dashboard – Tarjeta de Saturación  
   **↳ Acción:** Gerente hace clic en Gauge de Saturación Global  
   **↳ Destino:** Inventario 2D – Topología Cromática, pre-filtrada

4. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Gerente hace clic en botón \[📥 Exportar a Excel\] (esquina superior derecha, solo visible para Gerente)  
   **↳ Destino:** Descarga CSV/Excel con KPIs actuales

**5.6 Administrador de Etiquetado SSCC**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Supervisor hace clic en módulo "Etiquetado / SSCC"  
   **↳ Destino:** Administrador de Etiquetado SSCC

2. **Pantalla Origen:** Administrador de Etiquetado  
   **↳ Acción:** Usuario busca un SSCC para reimpresión  
   **↳ Destino:** Detalle de SSCC con previsualización de etiqueta

3. **Pantalla Origen:** Detalle de SSCC (Etiquetado)  
   **↳ Acción:** Usuario pulsa \[Reimprimir Etiqueta\]  
   **↳ Destino:** Modal de confirmación con campo obligatorio "Motivo de sustitución"

4. **Pantalla Origen:** Modal de Reimpresión  
   **↳ Acción:** Usuario escribe el motivo y confirma  
   **↳ Destino:** Confirmación de reimpresión \+ impresión física \+ registro en Audit Trail

**5.7 Auditoría e Inteligencia (Audit Trail / Copiloto)**

1. **Pantalla Origen:** Dashboard de KPIs  
   **↳ Acción:** Auditor hace clic en módulo "Auditoría e Inteligencia"  
   **↳ Destino:** Vista de Auditoría – Lista de eventos recientes (bloqueos, reimpresiones)

2. **Pantalla Origen:** Vista de Auditoría – lista de eventos  
   **↳ Acción:** Auditor selecciona un evento de alteración lógica  
   **↳ Destino:** Timeline detallado del registro (Versión 1 vs Versión 2 Diff visual)

3. **Pantalla Origen:** Vista de Auditoría – detalle de registro  
   **↳ Acción:** Auditor hace clic en el enlace del objeto asociado (SSCC/Lote)  
   **↳ Destino:** Módulo correspondiente enfocado en ese registro

**5.8 Alertas y Workflows de Retraso (Flujos Transversales)**

1. **Pantalla Origen:** Consola de Recepción (Capturista)  
   **↳ Acción:** Operador deja inactiva la pantalla con 12/24 pallets escaneados (Timer: 15 min)  
   **↳ Destino:** Pantalla actual oscurecida con un Modal de Advertencia Amarilla: "Llevas 15 min sin cerrar. Finaliza la captura."

2. **Pantalla Origen:** Timer 30 min superado  
   **↳ Acción:** El sistema escala la notificación en background  
   **↳ Destino:** Dashboard del Supervisor – Badge de Campana marca \[1\]

3. **Pantalla Origen:** Dashboard (Supervisor)  
   **↳ Acción:** Supervisor hace clic en Campana → Clic en "Alerta: Andén 11 detenido"  
   **↳ Destino:** Consola de Recepción, mostrando los datos faltantes para tomar acción

4. **Pantalla Origen:** Status 20 (Lotes en espera de validación Nestlé por \>2 horas)  
   **↳ Acción:** Sistema detecta cuello de botella y dispara alerta roja  
   **↳ Destino:** Dashboard del Supervisor/Inspector – Badge de Campana marca alerta crítica: "Tienes 3 lotes bloqueados hace más de 2h"

---

**6\. Fichas de Pantalla (UI Specs detalladas para Figma)**

**Pantalla 0: Topbar Transversal (Alertas y Usuario) \- NUEVO**

**Objetivo:** Centralizar notificaciones críticas y facilitar navegación rápida a eventos que requieren atención inmediata.

**Usuarios:** Todos los roles (contenido personalizado por RBAC).

**Layout:** Barra superior fija (sticky) en Azul Naval Profundo.

**Componentes Visuales:**

* Campana de Notificaciones \<Bell /\> con Badge numérico rojo indicando cantidad de alertas pendientes.

* Avatar/menú de usuario (extremo derecho).

**Interacción (Centro de Alertas):** Al hacer clic en la campana, se abre un Drawer/Dropdown categorizado:

* 🔴 **Rojas (Críticas):** Bloqueos de calidad, discrepancias volumétricas, retrasos severos (\> 1h), pallets en Status 20 por más de 2 horas.

* 🟡 **Amarillas (Advertencias):** Recordatorios de capturas a medias (15-30 min de inactividad), alertas de saturación próximas (\>80%).

* 🔵 **Azules (Informativas):** Liberación de Status 30 de Nestlé, confirmaciones de despacho exitoso.

**Acciones:** Cada alerta tiene un botón de CTA (Llamado a la acción) que navega directo al módulo/registro afectado (ej. \[Ir a Revisar Lote\], \[Completar Recepción\]).

**Reglas UI:**

* Badge rojo en campana solo aparece si hay alertas pendientes.

* Al hacer clic en una alerta, esta se marca como "leída" y desaparece del contador.

* Alertas críticas tienen vibración/sonido en terminales móviles.

---

**Pantalla 1: Dashboard de KPIs (Torre de Control)**

**Objetivo:** Erradicar "Momentos Excel". Visibilidad inmediata de la salud operativa del almacén.

**Usuarios:** Gerente de Operaciones, Supervisor.

**Layout:** Grid de 3 columnas (Tarjetas analíticas de alto contraste).

**Componentes Visuales:**

* **Gauge/Dona de Saturación:** Muestra % de Capacidad Global. Si pasa de 85%, el color muta de Azul a Rojo de advertencia.

* **Gráfico de Barras (Productividad):** Eje X (Montacarguistas por Gafete), Eje Y (Movimientos por hora). Destacar Top y Bottom performers con colores diferenciados.

* **Línea de Tendencia (Reversas):** Muestra el conteo de errores tipográficos o escaneos erróneos por turno (últimos 7 días).

* **Tarjeta de Alertas Activas:** Lista compacta de alertas críticas: camiones con \>3 horas en andén, lotes en cuarentena reciente, recepciones incompletas.

**Botón de Reporte:** Esquina superior derecha \[📥 Exportar a Excel\]. Solo visible para Gerente de Operaciones (RBAC).

**Interacción:**

* Las tarjetas de "Alertas Críticas" tienen enlaces profundos hacia los módulos afectados (clic en "Camión 3h en andén" → Consola de Recepción).

* Clic en Gauge de Saturación → Inventario 2D pre-filtrado por saturación.

---

**Pantalla 2: Consola de Recepción ("La Bóveda")**

**Objetivo:** Captura infalible de entradas y cuadratura matemática.

**Usuarios:** Operador de Andén, Líder de Turno.

**Entradas y Controles:**

* **Step 1 (Metadatos):** Placas (Input Alfanumérico, req.), Chofer (Input Text, req.), Sellos (Input Text, req.).

* **Step 2 (Escaneo):** Input oculto para recibir strings del escáner RF.

**Salidas y Componentes Visuales:**

* **Contenedor Principal:** Bordes sólidos, cabecera Azul Naval.

* **Indicador de Cuadratura:** Gráfico radial grande. Muestra fracción 22/24 (Escaneados/Esperados).

* **Tabla Buffer Asíncrono:** Muestra pallets escaneados con Badges de estado:

  * \[Status 10: Andén\] (Gris)

  * \[Status 20: Bolsa\] (Naranja)

**Acciones:**

* \[Registrar Metadatos\] → Avanza a Step 2\.

* \[Pausar Recepción\] → Guarda estado, permite retomar después.

* \[Cerrar Recepción Definitiva\] → Solo habilitado al 100% cuadratura.

* \[📄 Generar Manifiesto de Ingreso (PDF)\] → Aparece después del cierre exitoso.

**Reglas de Negocio en UI:**

* El botón \[Cerrar Recepción Definitiva\] permanece deshabilitado (opacity-50, cursor-not-allowed) hasta que el Indicador de Cuadratura alcance el 100%.

* Si el usuario abandona la pantalla con cuadratura a medias, se detona un Timer interno para la regla de alertas de inactividad (15 min → Modal Amarillo, 30 min → Escalación a Supervisor).

**Botón de Reporte:** Al completarse la cuadratura, aparece \[📄 Generar Manifiesto de Ingreso (PDF)\] con sello de tiempo, SSCCs ingresados, metadatos del camión.

---

**Pantalla 3: Consola de Expedición y Ruteo**

**Objetivo:** Gestionar salidas forzando reglas sanitarias comerciales (PEPS/FEFO).

**Usuarios:** Supervisor, Gerente de Operaciones.

**Controles:**

* Buscador de Órdenes de Salida (ASN cliente).

* Asignación de Rampa de Salida (dropdown).

* Botón \[Generar sugerencia PEPS/FEFO\].

**Visuales:**

* **Tabla de Picking Sugerido:** El sistema autocompleta la tabla. Muestra los SSCCs elegidos con un Badge verde \[FEFO Validado\].

* **Progreso de Carga:** Barra de progreso que se llena conforme el operador escanea los pallets en el andén de salida.

**Botón de Reporte:** Botón \[📄 Imprimir Remisión de Despacho\]. Genera PDF con SSCCs despachados, fechas, firmas digitales.

**Reglas UI:**

* Un Supervisor no puede alterar los SSCC sugeridos por el algoritmo a menos que tenga permisos de anulación especial (deja rastro en Audit Trail).

* El operador móvil no puede "saltarse" la sugerencia sin generar una alerta roja al supervisor.

---

**Pantalla 4: Topología Cromática 2D (Inventario)**

**Objetivo:** Gemelo digital táctico en vista de planta (cenital).

**Usuarios:** Gerente de Operaciones, Supervisor.

**Entradas y Controles:**

* **Filtros Globales:** Cliente (Nestlé), Rango de Vencimiento, Zonas (Rampa 11, Rampa 12).

* **Toggles de Vista:** \[Modo Saturación\], \[Modo Alertas NOM-251\].

**Salidas y Componentes Visuales:**

* **Canvas 2D/Planta:** Cuadrícula interactiva de bahías (CSS Grid).

* **Reglas Cromáticas (Saturación):**

  * 🟩 Verde: \> 85% (Óptimo / Alta Rentabilidad).

  * 🟦 Azul Naval/Celeste: 40% \- 84% (Táctico).

  * 🟨 Amarillo: \< 40% (Reserva).

  * 🟥 Rojo Vibrante parpadeante con Icono (🔒): Contiene al menos un SSCC bloqueado por calidad.

**Acciones:** Clic en Rack → Abre panel derecho (Drill-down) con lista de SSCCs exactos en esa ubicación, estados (10/20/30), flags de bloqueo.

---

**Pantalla 5: Módulo de Calidad (NOM-251)**

**Objetivo:** Centralizar el control sanitario algorítmico.

**Usuarios:** Inspector de Calidad, Auditor.

**Entradas y Controles:**

* **Buscador maestro:** SSCC, Lote, o Número de Remisión.

* **Selector de Causa de Defecto:** Dropdown estricto (ej. "Defecto de Planta", "Daño en Maniobra").

* Input Text para observaciones detalladas.

**Salidas y Componentes Visuales:**

* **Tabla de Inventario Sujeto a Revisión.** Las filas con estado "Bloqueado" tienen fondo levemente teñido de rojo (bg-red-50).

* **Columna de "Soporte Documental"** que permite visualizar si existe autorización del cliente para destrucción o devolución.

**Acciones:**

* \[Bloquear Unidad\] (Rojo) → Exige llenar causa \+ observaciones. Abre modal de confirmación severo: "⚠️ ATENCIÓN: Está a punto de bloquear el Lote X. Esta acción detendrá cualquier instrucción de salida pendiente en los terminales de los operadores. ¿Desea proceder y firmar digitalmente?"

* \[Liberar para Destrucción\]

* \[Liberar para Devolución\]

* \[Acondicionar Producto\]

**Botón de Reporte:** Botón secundario \[📥 Generar Sábana de Trazabilidad (Recall)\]. Descarga un PDF blindado con sellos de tiempo, camiones, origen/destino, cambios de estado, responsables.

**Mensajes de Confirmación (Tono Estricto):** Modal antes de bloqueo con lenguaje imperativo y campo de firma digital obligatorio.

---

**Pantalla 6: Administrador de Etiquetado SSCC**

**Objetivo:** Gestión de reimpresiones y trazabilidad GS1-128.

**Usuarios:** Supervisor, Administrador.

**Controles:**

* Input para buscar folio interno o SSCC.

* Botón \[Reimprimir Etiqueta\].

**Visuales:**

* **Previsualización gráfica de la etiqueta GS1-128** con el identificador de aplicación (00) más los 18 dígitos obligatorios del SSCC.

* Datos de origen: cliente, producto, fecha de ingreso, ubicación actual.

**Reglas UI:**

* Solo se puede reimprimir si se captura el motivo de "Sustitución de Etiqueta Dañada" (dropdown obligatorio \+ input de observaciones).

* Toda reimpresión se guarda en Audit Trail con timestamp y usuario responsable.

---

**7\. Backlog Semilla Priorizado (Product Roadmap Integrado)**

| ID | Módulo | Story (Como \[Rol\], quiero \[Acción\] para \[Beneficio\]) | Criterios de Aceptación (Testeables en UI) |
| :---- | :---- | :---- | :---- |
| **NOT-01** | Alertas | Como Capturista, quiero recibir un modal de recordatorio tras 15 min de inactividad, para no retrasar la rampa. | 1\. Modal Amarillo superpuesto. 2\. Botón de "Continuar captura". 3\. Timer reinicia al interactuar. |
| **NOT-02** | Alertas | Como Supervisor, quiero que la campana se ponga roja si hay lotes esperando en Status 20 por más de 2h, para presionar a Calidad. | 1\. Badge rojo en \<Bell /\>. 2\. Clic en alerta navega directo a tabla de Status 20\. 3\. Contador decrece al resolver. |
| **REP-01** | Reportes | Como Inspector QM, quiero un botón para generar la Sábana de Trazabilidad, para cumplir con auditorías sanitarias. | 1\. Botón \[📥 Descargar Recall\] visible solo para rol Quality/Admin. 2\. Exporta PDF con sellos de agua y metadatos inmutables. 3\. Registro en Audit Trail. |
| **REP-02** | Reportes | Como Gerente, quiero exportar los KPIs a Excel, para integrar datos a mis reportes corporativos. | 1\. Botón Exportar CSV/Excel en cabecera del Dashboard. 2\. Archivo descargado incluye todas las métricas visibles. 3\. Restringido por RBAC. |
| **DASH-01** | KPIs | Como Gerente, quiero ver la Tasa de Saturación Global, para tomar decisiones de S\&OP. | 1\. Gráfico circular de ocupación total. 2\. Umbral \>85% activa color rojo en el KPI. 3\. Clic en gauge navega a Inventario 2D. |
| **REC-01** | Recepción | Como Supervisor, quiero que la UI impida cerrar el andén si hay descuadre, para evitar inventario fantasma. | 1\. Botón "Cerrar" disabled si scanned \!= expected. 2\. Hover en botón muestra tooltip de "Faltan X pallets". 3\. Solo habilita al 100%. |
| **MET-01** | Estados | Como Operador, quiero ver el Status 20 resaltado, para no mover pallets en "Limbo". | 1\. Tabla de inventario renderiza Badge Naranja \[Status 20: ESPERA NESTLÉ\]. 2\. Opción de "Mover" desactivada en UI. 3\. Tooltip explica por qué está bloqueado. |
| **EXP-01** | Salidas | Como Supervisor, quiero que el sistema asigne automáticamente los lotes a despachar por regla FEFO. | 1\. Al crear orden de salida, la tabla de sugerencias se llena sola. 2\. Los lotes sugeridos son siempre los de fecha de caducidad más próxima. 3\. Respeta Status 30 y No bloqueado. |
| **EXP-02** | Salidas | Como Operador Móvil, quiero que el escáner me bloquee si intento cargar un pallet que viola el FEFO. | 1\. Escanear SSCC incorrecto lanza pantalla ROJA en terminal móvil. 2\. Mensaje: "Error: Respete PEPS/FEFO". 3\. No suma al progreso de carga. 4\. Chicharra sonora. |
| **QM-01** | Calidad | Como Inspector, quiero bloquear un lote defectuoso, para imposibilitar su despacho. | 1\. Botón \[Bloquear\] en detalle del SSCC. 2\. UI requiere Motivo obligatorio (dropdown \+ observaciones). 3\. SSCC muta a color Rojo (\#dc2626) en todas las vistas (Inventario 2D, Expedición, Terminal). 4\. Registro en Audit Trail. |
| **INV-01** | 2D Topo | Como Gerente, quiero un mapa de planta de las bahías codificado por ocupación volumétrica. | 1\. Grid 2D de racks (CSS Grid). 2\. Clases condicionales renderizan Verde/Amarillo/Celeste según capacidad ocupada en la DB. 3\. Bahías con lotes bloqueados tienen borde rojo parpadeante con candado 🔒. |
| **GOV-01** | Auditoría | Como Auditor, quiero ver el historial inmutable de un SSCC reimpreso o alterado. | 1\. Botón ⏱️ (Reloj) abre el Timeline del registro. 2\. Muestra Versión 1 y Versión 2 con Diff visual (qué cambió, quién lo hizo, timestamp). 3\. Solo lectura, no editable. |

---

**8\. Consideraciones Tecnológicas Finales**

**Reportes**

* Utilizar librerías como **pdfmake** o **jspdf** para el renderizado Front-End.

* Alternativamente, servicios Backend que devuelvan el stream inmutable del archivo para evitar alteraciones en el cliente (Requisito de "Paranoia Sistémica").

* Todos los PDFs deben incluir sellos de agua con timestamp, usuario generador y hash de integridad.

**Notificaciones**

* Implementar **WebSockets** o **Server-Sent Events (SSE)** para garantizar que las alertas y la campana se actualicen en Tiempo Real sin necesidad de refrescar el navegador.

* Priorizar notificaciones críticas (rojas) con vibración/sonido en terminales móviles.

**Audit Trail Inmutable**

* Ningún dato se sobrescribe. Cualquier corrección genera una "Versión 2", conservando el original inválido con rastro de autoría y sello de tiempo inviolable.

* Implementar **Event Sourcing** para registrar todos los cambios de estado como eventos inmutables.

**Seguridad y RBAC**

* Matriz de Roles estricta: el personal operativo solo registra; la edición queda bloqueada y requiere autorización digital de gerencia para cualquier excepción.

* Todas las acciones destructivas (bloqueos, eliminaciones lógicas, anulaciones FEFO) requieren firma digital y motivo documentado.

---

**Notas Finales para el Equipo Técnico**

Este documento funge como el **Contrato de Producto**. Ningún flujo de usuario debe permitir saltarse las validaciones de:

* **Cuadratura (Andén):** Botón de cierre bloqueado hasta 100% match.

* **Máquina de Estados (10/20/30):** Respeto estricto de transiciones de estado.

* **PEPS/FEFO (Expedición):** Algoritmo forzado, bloqueo en terminal móvil.

* **Bloqueos NOM-251 (Calidad):** Propagación sistémica inmediata a todas las vistas.

El sistema debe operar bajo el principio de **"Paranoia Sistémica"**: cero confianza en el usuario, validación algorítmica en cada paso, trazabilidad inmutable, y escalación proactiva de cuellos de botella.