**Documento Complementario: Sistema de Alertas de Anomalías y Notificación a Cliente**

**Proyecto:** Ecosistema WMS Inteligente 4.0 (Plataforma 4-GUARD)  
**Versión:** 6.1 (Módulo de Anomalías y Responsabilidad)  
**Audiencia:** Equipo de Diseño (Figma), Desarrollo Front-End, Arquitectura Backend, Inspectores de Calidad.

---

**1\. Introducción y Contexto**

Este documento extiende las **Especificaciones Funcionales V6.0** con la capa de **detección, reporte y notificación de anomalías** que faltaba en el sistema de alertas. Abarca tres dominios críticos:

1. **Anomalías de Inventario Sistémicas** – Discrepancias detectadas automáticamente entre inventario esperado vs real.

2. **Reporte de Anomalías Operativas por Montacarguista** – Daños físicos reportados manualmente desde terminal RF.

3. **Clasificación de Responsabilidad y Notificación al Cliente** – Flujo de decisión sobre origen del daño y generación de reportes formales.

---

**2\. Motor de Alertas – Sub-módulo de Anomalías**

**2.1 Tipos de Alerta Nuevos**

**🔴 Alerta Crítica de Anomalía de Inventario**

**Descripción:** El sistema detecta una diferencia significativa entre el inventario esperado y el encontrado durante conteos físicos, auditorías cíclicas o movimientos de ajuste.

**Trigger:**

* Diferencia absoluta \> umbral configurable (ej. ±3 unidades).

* Diferencia porcentual \> 2% del lote total.

* Detección en módulos: Inventario 2D, Ajustes, Conteos cíclicos.

**Destinatarios:**

* Supervisor de Operaciones (primario).

* Inspector de Calidad (secundario).

**Comportamiento en UI:**

* Campana \<Bell /\> muestra badge rojo con contador incrementado.

* Item en Centro de Alertas:

  * **Título:** "⚠️ Discrepancia de inventario en Bahía B-12"

  * **Detalle:** "Esperado: 120 unidades – Encontrado: 114 unidades (–6 unidades, –5%)"

  * **Timestamp:** Fecha y hora de detección.

  * **CTA:** Botón \[Ir a bahía\] → navega a Inventario 2D filtrado a esa bahía específica con el lote resaltado.

**Comportamiento en Inventario 2D:**

* La bahía afectada muestra un ícono de advertencia ⚠️ superpuesto sobre el color cromático.

* Al abrir el drawer de la bahía, la fila del lote discrepante aparece con borde amarillo pulsante.

---

**🟡 Alerta de Incidente Reportado por Montacarguista**

**Descripción:** Un operador detecta una anomalía física (frasco roto, fuga, empaque dañado, estiba peligrosa) y la reporta manualmente desde su terminal móvil.

**Trigger:**

* Operador pulsa botón \[⚠ Reportar Anomalía\] desde cualquier tarea en curso (Recepción, Acomodo, Picking).

**Destinatarios:**

* Supervisor de turno (primario, notificación inmediata).

* Inspector de Calidad (secundario, para revisión).

**Comportamiento en UI:**

* Campana \<Bell /\> muestra badge amarillo (advertencia, no crítico).

* Item en Centro de Alertas:

  * **Título:** "📋 Incidente reportado por Operador \#GAFETE en Bahía C-07"

  * **Detalle:** "Tipo: Frasco roto | SSCC: 00341234567890123456 | Responsabilidad preliminar: Daño durante maniobra interna"

  * **Timestamp:** Fecha y hora del reporte.

  * **Fotos adjuntas:** Miniatura si el operador adjuntó evidencia.

  * **CTA:** Botón \[Abrir incidencia\] → navega al detalle de incidente en Módulo de Calidad.

**Comportamiento en Terminal Móvil:**

* Tras enviar el reporte, el operador ve confirmación: "✅ Incidencia INC-2026-000123 registrada. Calidad revisará el producto. Continúa con tu ruta."

---

**🔵 Alerta Informativa de Notificación a Cliente**

**Descripción:** Se ha generado y enviado un reporte formal de incidente al cliente o proveedor.

**Trigger:**

* Inspector de Calidad o Gerente completa la clasificación de responsabilidad y ejecuta acción \[Notificar a cliente\].

**Destinatarios:**

* Gerente de Operaciones (informativo).

* Auditor / Cumplimiento (registro).

**Comportamiento en UI:**

* Campana \<Bell /\> muestra badge azul (informativo, baja prioridad).

* Item en Centro de Alertas:

  * **Título:** "📤 Cliente Nestlé notificado por incidente en Lote 99A"

  * **Detalle:** "Clasificación: Daño interno | Folio: INC-2026-000123 | Acta generada: 19/03/2026 15:42"

  * **CTA:** Botón \[Ver reporte\] → abre visor del PDF de "Acta de Incidente".

---

**3\. Terminal Móvil – Pantalla "Reporte de Anomalía"**

**3.1 Ficha de Pantalla RF-ANOM-01: Reporte de Anomalía**

**Objetivo:** Permitir al montacarguista reportar anomalías físicas en producto o entorno desde la tarea en curso, sin salir del flujo guiado.

**Usuarios:** Operador / Montacarguista.

**Contexto de Acceso:**

* Disponible desde cualquier pantalla de tarea activa: Recepción, Acomodo (Put-away), Picking (Salida).

* Botón secundario flotante \[⚠ Reportar Anomalía\] siempre visible en la esquina inferior derecha (diseño accesible con pulgar).

---

**3.2 Entradas y Controles**

**Formulario de Reporte (Pantalla Completa en Terminal):**

1. **Tipo de anomalía (Dropdown obligatorio):**

   * "Embalaje dañado"

   * "Frasco/Envase roto"

   * "Fuga/Líquido derramado"

   * "Estiba inestable"

   * "Producto contaminado"

   * "Daño por plagas"

   * "Otro (especificar)"

2. **Responsabilidad percibida (Dropdown obligatorio):**

   * "Detectado al recibir (origen cliente/proveedor)"

   * "Ocurrido durante maniobra interna (culpa nuestra)"

   * "Daño por condiciones de transporte (sin responsable claro)"

   * "No determinado (requiere investigación)"

3. **SSCC/Lote afectado:**

   * Autocompletado desde la tarea actual.

   * Si el operador está en modo libre (no en tarea), campo editable con escáner.

4. **Comentario del operador (Textarea):**

   * Obligatorio si selecciona "Otro" o "No determinado".

   * Máximo 200 caracteres.

   * Ejemplo de placeholder: "Describe qué ocurrió: cuándo, dónde, cómo..."

5. **Adjuntar evidencias (Opcional):**

   * Botón \[📷 Tomar foto\] → abre cámara del dispositivo.

   * Botón \[Adjuntar foto existente\] → abre galería.

   * Máximo 3 fotos por reporte.

   * Compresión automática a 1MB por imagen.

---

**3.3 Comportamiento y Reglas**

**Al enviar el reporte:**

1. **Validación de campos obligatorios:**

   * Si falta tipo de anomalía o responsabilidad percibida, muestra toast rojo: "⚠️ Completa todos los campos obligatorios".

2. **Creación de incidencia:**

   * El sistema genera un folio único: INC-{AÑO}-{NÚMERO\_SECUENCIAL} (ej. INC-2026-000123).

   * El SSCC/Lote asociado cambia automáticamente a estado **"En revisión de Calidad"**.

3. **Bloqueo preventivo:**

   * El sistema bloquea nuevas tareas de salida (picking) sobre ese SSCC hasta que Calidad decida su destino.

   * Si hay una tarea de picking activa para ese SSCC, se cancela automáticamente y se notifica al supervisor.

4. **Disparo de alerta:**

   * Se genera una **Alerta Amarilla** 🟡 en la campana del Supervisor y del Inspector de Calidad.

   * Contenido de la alerta: tipo de anomalía, operador reportante, ubicación, timestamp.

5. **Mensaje de confirmación en RF:**

   * Pantalla completa verde con checkmark: "✅ Incidencia INC-2026-000123 registrada correctamente. Calidad revisará el producto. Puedes continuar con tu siguiente tarea."

   * Botón \[Continuar\] regresa al menú de tareas.

---

**3.4 Diseño y Usabilidad (Terminal Móvil)**

**Principios de diseño:**

* Botones grandes (mínimo 44x44 px) para uso con guantes industriales.

* Alto contraste: fondo blanco, texto negro, botones azul naval y rojo vibrante.

* Dropdowns con opciones limitadas (máximo 7 opciones) para evitar scroll excesivo.

* Confirmación visual clara antes de enviar (modal: "¿Confirmas el reporte de anomalía?").

**Accesibilidad:**

* Soporte para escáneres RF externos vía Bluetooth.

* Vibración háptica al completar el envío.

* Lectura de voz opcional para operadores con discapacidad visual (texto a voz de campos obligatorios).

---

**4\. Módulo de Calidad – Gestión de Incidencias de Anomalía**

**4.1 Ampliación del Módulo de Calidad (NOM-251)**

El Módulo de Calidad existente se extiende con una nueva sección: **"Incidencias de Anomalía"**.

---

**4.2 Vista: Lista de Incidencias Reportadas**

**Objetivo:** Centralizar todas las anomalías detectadas (sistémicas y operativas) en una tabla unificada.

**Usuarios:** Inspector de Calidad, Supervisor, Auditor (solo lectura).

**Ubicación:** Nueva pestaña dentro del Módulo de Calidad: \[Inventario QM\] | \[Incidencias de Anomalía\] | \[Bloqueos Activos\].

---

**4.3 Componentes de la Vista**

**Filtros disponibles:**

* **Estado de incidencia:**

  * \[En revisión\]

  * \[Clasificada – Daño interno\]

  * \[Clasificada – Daño origen\]

  * \[Notificada a cliente\]

  * \[Cerrada\]

* **Tipo de anomalía:** (Todas las opciones del dropdown de terminal móvil).

* **Origen del reporte:**

  * \[Montacarguista\] (reporte manual).

  * \[Sistema\] (discrepancia de inventario automática).

  * \[Auditoría\] (detectado en conteo físico).

* **Rango de fechas:** Desde / Hasta.

* **Cliente afectado:** Dropdown (Nestlé, otros clientes).

**Columnas de la tabla:**

* **Folio de Incidencia** (INC-XXXX) – Clickeable, abre detalle.

* **Fecha y hora** – Timestamp de creación.

* **SSCC / Lote** – Identificador del producto afectado.

* **Tipo de anomalía** – Badge con ícono (🔴 para daños críticos, 🟡 para leves).

* **Responsabilidad preliminar** – Según reporte inicial del operador (puede cambiar después de clasificación).

* **Estado actual** – Badge de color:

  * \[En revisión\] (Amarillo)

  * \[Clasificada\] (Azul)

  * \[Notificada\] (Verde)

  * \[Cerrada\] (Gris)

* **Reportado por** – Nombre o gafete del operador / "Sistema automático".

* **Acciones rápidas:**

  * \[👁️ Revisar\] → Abre detalle completo.

  * \[📥 Generar Acta\] → Solo habilitado tras clasificación.

  * \[✔️ Cerrar\] → Marca incidencia como resuelta (requiere motivo).

---

**4.4 Detalle de Incidencia (Pantalla Completa)**

**Objetivo:** Permitir a Calidad revisar evidencia, clasificar responsabilidad, decidir destino del producto y disparar notificación al cliente.

---

**4.5 Secciones del Detalle**

**Sección 1: Información General**

**Campos de solo lectura:**

* **Folio de incidencia:** INC-2026-000123

* **Fecha y hora de reporte:** 19/03/2026 14:35:42

* **Usuario que reportó:** Operador \#GAFETE-1234 (Juan Pérez)

* **Módulo desde el que se reportó:** Terminal Móvil – Tarea de Picking en Bahía C-07

* **Estado actual de la incidencia:** Badge con color (En revisión, Clasificada, etc.)

---

**Sección 2: Producto Afectado**

**Información del lote:**

* **SSCC:** 00341234567890123456

* **Lote:** L-2026-03-001

* **Cliente:** Nestlé México S.A. de C.V.

* **SKU:** Nescafé Clásico 200g Frasco

* **Ubicación actual:** Bahía C-07, Nivel 2, Posición 3

* **Estado WMS actual:** "En revisión de Calidad" (bloqueado para salida)

* **Cantidad afectada:** 48 unidades (1 pallet completo) o fraccionado si aplica

**Visualización de ubicación:**

* Mini-mapa 2D mostrando la bahía exacta con el SSCC resaltado en amarillo.

---

**Sección 3: Evidencia Recopilada**

**Tipo de anomalía reportada:** Badge grande con ícono (ej. "🔴 Frasco/Envase roto")

**Responsabilidad percibida (preliminar):**

* "Ocurrido durante maniobra interna" (Badge rojo si es daño interno)

**Comentario del operador:**

* Textarea de solo lectura con el texto original:

  * "Durante el picking noté que 3 frascos del pallet tenían la tapa rota. Parece que el pallet se golpeó contra el rack al momento de bajarlo."

**Fotos adjuntas:**

* Galería de imágenes (viewer con zoom).

* Botón \[Descargar todas las fotos\] (ZIP).

---

**Sección 4: Clasificación de Responsabilidad (Inspector de Calidad)**

**Campo principal: "Clasificación final" (Dropdown obligatorio):**

* "Daño interno (maniobra dentro del almacén)" → Genera responsabilidad del 3PL.

* "Daño de origen (producto recibido ya dañado)" → Responsabilidad del cliente/proveedor.

* "Daño por condiciones externas (transporte, clima, sin responsable claro)" → Neutral.

* "Falsa alarma (no hay daño real)" → Cierra sin acción.

**Campo secundario: "Destino del producto" (Dropdown obligatorio tras clasificación):**

* "Merma interna / Destrucción controlada" → Producto se envía a zona de merma.

* "Devolución a cliente/proveedor" → Se prepara para recolección.

* "Reacondicionamiento posible" → Calidad intenta recuperar unidades viables.

* "Sin acción (producto aún usable)" → Se libera y regresa a disponible.

**Campo: "Observaciones del inspector" (Textarea obligatorio):**

* Mínimo 50 caracteres.

* Ejemplo: "Tras revisión física, confirmo que 3 frascos tienen tapa rota. El daño ocurrió durante descenso del pallet. Operador aplicó fuerza excesiva con el montacargas. Se procede a merma interna."

**Firma digital:**

* Checkbox obligatorio: "Confirmo que la información es correcta y asumo responsabilidad de esta clasificación."

* Al marcar, se registra timestamp y usuario en Audit Trail.

---

**4.6 Acciones Disponibles en Detalle**

**Acción 1: \[🔴 Aplicar Bloqueo Sanitario\]**

**Comportamiento:**

* Marca el lote/SSCC como **BLOQUEADO** (color Rojo Vibrante en todas las vistas).

* Inhibe cualquier intento de despacho en terminal RF (pantalla roja con mensaje de acceso denegado).

* Propaga el bloqueo a:

  * Inventario 2D (bahía con borde rojo parpadeante \+ candado 🔒).

  * Consola de Expedición (SSCC aparece como "No disponible" en sugerencias FEFO).

  * Terminal Móvil (escaneo rechazado con chicharra \+ pantalla roja).

**Validación:**

* Solo disponible si el estado es "En revisión" o "Clasificada".

* Requiere motivo documentado (campo obligatorio).

---

**Acción 2: \[📄 Generar Acta de Incidente\]**

**Objetivo:** Crear un documento formal PDF con toda la información de la incidencia para envío a cliente o auditoría.

**Componentes del PDF:**

1. **Encabezado:**

   * Logo del 3PL y logo de 4-GUARD.

   * Título: "ACTA DE INCIDENTE DE CALIDAD"

   * Folio: INC-2026-000123

   * Fecha de generación: 19/03/2026 15:42

2. **Datos de la Incidencia:**

   * Fecha y hora del evento.

   * Usuario reportante.

   * Tipo de anomalía.

   * Responsabilidad clasificada (Daño interno / Daño origen / Externo).

3. **Producto Afectado:**

   * SSCC, Lote, Cliente, SKU, cantidad.

   * Ubicación en almacén.

4. **Evidencia:**

   * Comentario del operador.

   * Observaciones del inspector.

   * Fotos incrustadas (hasta 3 imágenes).

5. **Decisión y Destino:**

   * Destino del producto (merma, devolución, reacondicionamiento).

   * Acciones tomadas.

6. **Firmas Digitales:**

   * Inspector de Calidad: Nombre, timestamp, hash de firma.

   * Supervisor (si aplica): Nombre, timestamp.

7. **Sellos de Agua:**

   * Marca de agua: "DOCUMENTO OFICIAL \- NO ALTERABLE"

   * Hash SHA-256 del documento para verificación de integridad.

   * QR Code con enlace al registro en Audit Trail (opcional).

**Restricciones:**

* Solo puede generarse una vez por incidencia.

* Si se requiere regenerar, se crea una "Versión 2" con registro de cambios en Audit Trail.

**Acción tras generación:**

* El PDF se almacena en servidor seguro.

* Se habilita el botón \[📤 Notificar a cliente\].

---

**Acción 3: \[📤 Notificar a Cliente\]**

**Objetivo:** Enviar formalmente el Acta de Incidente al cliente o proveedor con evidencia documentada.

**Requisitos previos:**

* El Acta de Incidente debe estar generada.

* La clasificación de responsabilidad debe estar completa.

**Comportamiento:**

1. **Confirmación previa:**

   * Modal de advertencia: "⚠️ ATENCIÓN: Estás a punto de notificar oficialmente a Nestlé sobre este incidente. Esta acción es irreversible y quedará registrada en Audit Trail. ¿Confirmas?"

   * Botones: \[Cancelar\] | \[Confirmar y Enviar\]

2. **Al confirmar:**

   * El sistema marca la incidencia como **"Notificada a cliente"**.

   * Se genera un registro en Audit Trail con:

     * Usuario que ejecutó la notificación.

     * Timestamp exacto.

     * Hash del PDF enviado.

   * Se dispara una **Alerta Informativa Azul** 🔵 al Gerente de Operaciones:

     * Título: "📤 Cliente Nestlé notificado por incidente en Lote 99A"

     * Detalle: "Clasificación: Daño interno | Folio: INC-2026-000123 | Acta generada: 19/03/2026 15:42"

     * CTA: \[Ver reporte\] → abre el PDF.

3. **Opciones de envío:**

   * **Correo electrónico automático:**

     * Destinatarios configurados por cliente (ej. [calidad@nestle.com.mx](mailto:calidad@nestle.com.mx)).

     * Asunto: "Notificación de Incidente de Calidad \- Folio INC-2026-000123"

     * Cuerpo: Texto formal \+ PDF adjunto.

   * **Descarga manual:**

     * Si el cliente requiere entrega en persona o por otro medio, el inspector puede descargar el PDF y enviarlo manualmente.

     * El sistema igual registra que se ejecutó la acción de notificación.

4. **Estado final:**

   * La incidencia pasa a estado "Notificada" (badge verde).

   * El producto afectado puede ser movido a zona de merma, devolución o destrucción según el destino clasificado.

---

**5\. Discrepancias de Inventario – Flujo de Anomalía Sistémica**

**5.1 Contexto**

Este flujo cubre las **anomalías detectadas automáticamente por el sistema** durante:

* Conteos físicos (auditorías cíclicas).

* Ajustes de inventario manuales.

* Movimientos de consolidación o transferencia entre ubicaciones.

---

**5.2 Flujo Completo**

**Paso 1: Conteo o Ajuste en Inventario 2D**

**Acción del usuario:**

* Un supervisor o auditor realiza un conteo físico de una bahía específica.

* Ingresa al módulo de Inventario 2D → selecciona bahía → opción \[Iniciar conteo\].

**Formulario de conteo:**

* **SSCC/Lote a contar:** Lista desplegable con todos los lotes en esa ubicación.

* **Cantidad esperada (sistema):** Autocompletada desde base de datos.

* **Cantidad contada (real):** Input manual o escáner RF.

* **Diferencia:** Calculada automáticamente: (Contado \- Esperado).

---

**Paso 2: Trigger de Discrepancia**

**Condición de disparo:**

* Si |esperado – contado| \> umbral (configurable: ej. ±3 unidades o ±2%).

**Acción del sistema:**

* Crea automáticamente una incidencia tipo **"Anomalía de Inventario"** con folio único (ej. ANOM-INV-2026-0045).

* Muestra inmediatamente en UI:

  * **Badge de advertencia ⚠️** en la fila del lote (tabla de inventario).

  * **Ícono de advertencia ⚠️** superpuesto en la bahía correspondiente del mapa 2D.

**Alertas disparadas:**

* **Alerta Crítica Roja** 🔴 en campana de Supervisor y Calidad.

* Contenido:

  * Título: "⚠️ Discrepancia de inventario en Bahía B-12"

  * Detalle: "Lote L-2026-03-001 | Esperado: 120 – Encontrado: 114 (–6 unidades, –5%)"

  * CTA: \[Ir a bahía\] → navega a Inventario 2D filtrado.

---

**Paso 3: Navegación y Revisión**

**Acción del supervisor:**

* Hace clic en la alerta de la campana.

* Es redirigido al **Inventario 2D** con filtros aplicados automáticamente:

  * Bahía: B-12

  * Estado: "Con anomalía"

**Vista en Inventario 2D:**

* La bahía B-12 tiene un borde amarillo pulsante.

* Al abrir el drawer de la bahía, la fila del lote L-2026-03-001 aparece resaltada con:

  * Badge: \[⚠️ Discrepancia de –6 unidades\]

  * Botón: \[Abrir incidencia\]

---

**Paso 4: Apertura de Incidencia**

**Acción del supervisor:**

* Hace clic en \[Abrir incidencia\].

* Es redirigido al **Módulo de Calidad → Incidencias de Anomalía → Detalle de ANOM-INV-2026-0045**.

**Vista de detalle de incidencia sistémica:**

* **Tipo de anomalía:** "Discrepancia de inventario (detección automática)"

* **Origen:** "Sistema \- Conteo físico en Bahía B-12"

* **Producto afectado:** SSCC, Lote, Cliente, SKU, ubicación.

* **Evidencia:**

  * Tabla comparativa:

| Campo | Esperado | Contado | Diferencia |
| :---- | :---- | :---- | :---- |
| Cantidad | 120 | 114 | –6 (–5%) |

  * Timestamp del conteo.

  * Usuario que realizó el conteo.

---

**Paso 5: Resolución de la Discrepancia**

**Campo: "Causa de la discrepancia" (Dropdown obligatorio):**

* "Error de captura inicial (inventario teórico incorrecto)"

* "Merma no registrada (producto deteriorado)"

* "Robo / Faltante (requiere investigación)"

* "Producto movido a otra ubicación sin registro"

* "Error del conteo físico actual (reconteo necesario)"

**Campo: "Acción correctiva" (Dropdown obligatorio):**

* "Ajustar inventario teórico al real" → Actualiza base de datos.

* "Reconteo físico" → Programa nuevo conteo para verificación.

* "Investigación interna" → Escala a gerencia / seguridad.

* "Registro de merma" → Genera reporte de pérdida.

**Campo: "Observaciones del supervisor" (Textarea obligatorio):**

* Mínimo 30 caracteres.

* Ejemplo: "Tras revisar con el operador, confirmamos que 6 unidades fueron retiradas ayer para merma pero no se registró el movimiento. Se procede a ajustar inventario."

**Acción: \[Aplicar corrección\]**

* Actualiza el inventario en base de datos.

* Registra el ajuste en Audit Trail con:

  * Usuario responsable.

  * Causa y acción correctiva.

  * Cantidad ajustada.

  * Timestamp.

**Cambio de estado de incidencia:**

* De "En revisión" a "Cerrada" (badge gris).

* La alerta desaparece de la campana.

* El badge ⚠️ en Inventario 2D se elimina.

---

**Paso 6: Opcional – Notificación al Cliente**

**Escenario:**

* Si la discrepancia afecta un embarque específico de un cliente (ej. faltantes en lote destinado a Nestlé), el supervisor puede optar por notificar formalmente.

**Acción:**

* En el detalle de la incidencia, aparece botón \[📤 Generar reporte de discrepancia para cliente\].

* Crea un PDF similar al Acta de Incidente con:

  * Descripción de la discrepancia.

  * Causa determinada.

  * Acción correctiva aplicada.

  * Firmas digitales.

**Envío:**

* Correo electrónico automático o descarga manual.

* Registro en Audit Trail.

---

**6\. Backlog de User Stories – Módulo de Anomalías**

**Alertas de Anomalía**

**NOT-ANOM-01: Alerta de discrepancia de inventario**

**Como** Supervisor  
**Quiero** recibir una alerta roja cuando una bahía tenga una discrepancia de inventario superior al umbral  
**Para** investigar y corregir antes de que afecte al cliente o genere inventario fantasma.

**Criterios de aceptación:**

1. Al detectar discrepancia \> umbral, la campana \<Bell /\> muestra badge rojo con contador incrementado.

2. El centro de alertas lista el folio de incidencia, la bahía afectada y el delta de unidades.

3. Clic en la alerta navega a Inventario 2D filtrado y abre el panel de detalle de la bahía con el lote resaltado.

4. El ícono ⚠️ aparece superpuesto en la bahía del mapa 2D.

---

**NOT-ANOM-02: Alerta de Status 20 prolongado (ya cubierta en V6.0)**

*(Mantener para coherencia del sistema de alertas)*

---

**Reporte de Anomalías en Terminal RF**

**RF-ANOM-01: Reporte de anomalía desde terminal móvil**

**Como** Montacarguista  
**Quiero** poder reportar rápidamente un frasco roto o empaque dañado desde mi tarea actual  
**Para** que Calidad evalúe y bloquee ese producto antes de que salga del almacén.

**Criterios de aceptación:**

1. Botón flotante \[⚠ Reportar Anomalía\] visible en todas las pantallas de tarea (Recepción, Acomodo, Picking).

2. Al hacer clic, abre formulario completo con campos: Tipo de anomalía (dropdown), Responsabilidad percibida (dropdown), Comentario (textarea), Adjuntar fotos (opcional).

3. Todos los campos obligatorios deben estar llenos para habilitar botón \[Enviar reporte\].

4. Al enviar:

   * Se crea incidencia con folio único (INC-{AÑO}-{NÚMERO}).

   * El SSCC afectado cambia a estado "En revisión de Calidad".

   * Se dispara Alerta Amarilla 🟡 en campana de Supervisor e Inspector.

   * Mensaje de confirmación en terminal: "✅ Incidencia INC-XXXX registrada. Continúa con tu ruta."

---

**RF-ANOM-02: Bloqueo preventivo tras reporte**

**Como** Sistema  
**Quiero** bloquear automáticamente el SSCC reportado  
**Para** evitar que sea despachado mientras Calidad lo revisa.

**Criterios de aceptación:**

1. Al crear la incidencia, el estado del SSCC cambia a "En revisión de Calidad" en base de datos.

2. Si existe una tarea de picking activa para ese SSCC, se cancela automáticamente y se notifica al supervisor.

3. Intentos de escaneo desde terminal móvil muestran pantalla amarilla: "⚠️ SSCC en revisión de Calidad. No disponible para movimiento."

---

**Gestión de Incidencias en Módulo de Calidad**

**QM-ANOM-01: Lista de incidencias con filtros**

**Como** Inspector de Calidad  
**Quiero** ver un listado de todas las incidencias reportadas con filtros por estado, tipo y origen  
**Para** priorizar revisión y clasificar responsabilidad eficientemente.

**Criterios de aceptación:**

1. Nueva pestaña \[Incidencias de Anomalía\] dentro del Módulo de Calidad.

2. Tabla con columnas: Folio, Fecha/hora, SSCC/Lote, Tipo de anomalía, Responsabilidad preliminar, Estado, Reportado por, Acciones.

3. Filtros funcionales:

   * Estado (En revisión, Clasificada, Notificada, Cerrada).

   * Tipo de anomalía (dropdown con todas las opciones).

   * Origen del reporte (Montacarguista, Sistema, Auditoría).

   * Rango de fechas.

   * Cliente afectado.

4. Al aplicar filtros, la tabla se actualiza en tiempo real sin recargar la página.

5. Clic en cualquier folio abre el detalle completo de la incidencia.

---

**QM-ANOM-02: Clasificación de responsabilidad**

**Como** Inspector de Calidad  
**Quiero** clasificar si el daño fue interno, de origen o externo  
**Para** documentar correctamente la responsabilidad frente al cliente y aplicar el protocolo adecuado.

**Criterios de aceptación:**

1. En el detalle de incidencia, campo "Clasificación final" (dropdown obligatorio) con opciones:

   * Daño interno (maniobra dentro del almacén).

   * Daño de origen (producto recibido ya dañado).

   * Daño por condiciones externas (transporte, clima).

   * Falsa alarma (no hay daño real).

2. Campo "Destino del producto" (dropdown obligatorio) con opciones:

   * Merma interna / Destrucción.

   * Devolución a cliente/proveedor.

   * Reacondicionamiento posible.

   * Sin acción (producto aún usable).

3. Campo "Observaciones del inspector" (textarea obligatorio, mínimo 50 caracteres).

4. Checkbox de firma digital: "Confirmo que la información es correcta".

5. La clasificación queda registrada en Audit Trail con timestamp y usuario.

6. El botón \[Generar Acta\] solo se habilita tras completar la clasificación.

---

**Reportes y Notificación a Cliente**

**REP-ANOM-01: Generación de Acta de Incidente**

**Como** Inspector de Calidad / Gerente  
**Quiero** generar un Acta de Incidente en PDF con toda la evidencia  
**Para** tener un documento oficial que pueda enviar al cliente o presentar en auditorías.

**Criterios de aceptación:**

1. Botón \[📄 Generar Acta de Incidente\] visible en detalle de incidencia solo para roles Quality/Admin.

2. Al hacer clic, el sistema crea un PDF con:

   * Encabezado con logos y folio.

   * Datos completos de la incidencia (fecha, tipo, responsabilidad, producto afectado).

   * Evidencia (comentarios, observaciones, fotos incrustadas).

   * Decisión y destino del producto.

   * Firmas digitales con timestamp.

   * Sellos de agua y hash SHA-256 para integridad.

3. El PDF se almacena en servidor seguro y queda asociado a la incidencia.

4. Se registra la generación en Audit Trail.

5. Tras generar el Acta, se habilita el botón \[📤 Notificar a cliente\].

---

**REP-ANOM-02: Notificación formal al cliente**

**Como** Inspector de Calidad / Gerente  
**Quiero** notificar formalmente al cliente sobre el incidente con evidencia documentada  
**Para** cumplir con protocolos de transparencia y dejar constancia legal del evento.

**Criterios de aceptación:**

1. Botón \[📤 Notificar a cliente\] solo habilitado tras generar el Acta de Incidente.

2. Al hacer clic, muestra modal de confirmación: "⚠️ Esta acción es irreversible y quedará registrada en Audit Trail. ¿Confirmas?"

3. Al confirmar:

   * La incidencia cambia a estado "Notificada a cliente" (badge verde).

   * Se envía correo electrónico automático a destinatarios configurados por cliente (ej. [calidad@nestle.com.mx](mailto:calidad@nestle.com.mx)) con PDF adjunto.

   * Se genera Alerta Informativa Azul 🔵 al Gerente: "📤 Cliente Nestlé notificado por incidente en Lote XXX".

   * Se registra en Audit Trail: usuario, timestamp, hash del PDF enviado.

4. El botón \[📤 Notificar\] se deshabilita y muestra badge "Ya notificado el 19/03/2026 15:42".

---

**Resolución de Discrepancias de Inventario**

**INV-ANOM-01: Ajuste de inventario tras discrepancia**

**Como** Supervisor  
**Quiero** poder ajustar el inventario teórico al real tras investigar una discrepancia  
**Para** mantener la integridad de los datos y evitar inventario fantasma.

**Criterios de aceptación:**

1. En el detalle de incidencia de tipo "Anomalía de Inventario", campo "Causa de la discrepancia" (dropdown obligatorio) con opciones:

   * Error de captura inicial.

   * Merma no registrada.

   * Robo / Faltante.

   * Producto movido sin registro.

   * Error del conteo físico actual.

2. Campo "Acción correctiva" (dropdown obligatorio):

   * Ajustar inventario teórico al real.

   * Reconteo físico.

   * Investigación interna.

   * Registro de merma.

3. Campo "Observaciones del supervisor" (textarea obligatorio, mínimo 30 caracteres).

4. Botón \[Aplicar corrección\] → actualiza inventario en base de datos.

5. El ajuste queda registrado en Audit Trail con: usuario, causa, acción correctiva, cantidad ajustada, timestamp.

6. La incidencia cambia a estado "Cerrada" y la alerta desaparece de la campana.

7. El badge ⚠️ en Inventario 2D se elimina.

---

**7\. Consideraciones de Diseño UX/UI**

**7.1 Paleta de Colores para Anomalías**

Coherente con el sistema 4-GUARD:

* **🔴 Rojo Vibrante (\#dc2626):** Anomalías críticas (daños físicos, bloqueos sanitarios, discrepancias graves).

* **🟡 Amarillo/Naranja (\#f59e0b):** Advertencias (incidentes reportados pendientes de revisión, discrepancias leves).

* **🟦 Azul Informativo (\#3b82f6):** Notificaciones completadas, confirmaciones.

* **⚪ Gris (\#6b7280):** Incidencias cerradas o archivadas.

---

**7.2 Iconografía**

* ⚠️ **Advertencia general** (discrepancias, anomalías leves).

* 🔴 **Daño crítico** (frascos rotos, fugas, contaminación).

* 📋 **Reporte manual** (incidentes reportados por operadores).

* 📤 **Notificación enviada** (comunicación formal con cliente).

* 🔒 **Bloqueo sanitario** (producto en cuarentena).

* 📷 **Evidencia fotográfica** (fotos adjuntas).

---

**7.3 Micro-copy y Mensajes**

**Tono:** Imperativo, claro, sin ambigüedades. Coherente con el principio de "Paranoia Sistémica".

**Ejemplos:**

**Modal de advertencia en terminal móvil (al intentar escanear SSCC bloqueado):**  
⛔ ACCESO DENEGADO

Este producto está en CUARENTENA DE CALIDAD.

No puedes moverlo ni despacharlo.

Retira la unidad a la zona de merma y reporta al supervisor.

\[Entendido\]

**Modal de confirmación para notificar a cliente:**  
⚠️ ATENCIÓN: ACCIÓN IRREVERSIBLE

Estás a punto de notificar oficialmente a Nestlé sobre este incidente.

Esta acción quedará registrada permanentemente en Audit Trail y no puede deshacerse.

¿Confirmas el envío del Acta de Incidente INC-2026-000123?

\[Cancelar\] \[Confirmar y Enviar\]

**Toast de confirmación tras reportar anomalía:**  
✅ Incidencia INC-2026-000123 registrada correctamente

Calidad revisará el producto. Puedes continuar con tu siguiente tarea.

\[OK\]

---

**8\. Integración con Audit Trail**

**Eventos registrados obligatoriamente:**

1. Creación de incidencia (manual o automática).

2. Cambios de estado de la incidencia.

3. Clasificación de responsabilidad (usuario, timestamp, clasificación aplicada).

4. Generación de Acta de Incidente (hash del PDF).

5. Notificación enviada al cliente (destinatarios, timestamp, hash del archivo).

6. Ajustes de inventario por discrepancia (cantidad ajustada, causa, usuario).

7. Bloqueos y desbloqueos de SSCCs relacionados con la incidencia.

**Estructura del registro en Audit Trail:**  
{  
"event\_id": "AUD-2026-789456",  
"timestamp": "2026-03-19T15:42:35-06:00",  
"user": "[inspector.calidad@almacen.com](mailto:inspector.calidad@almacen.com)",  
"action": "incidence\_notification\_sent",  
"entity\_type": "anomaly\_incidence",  
"entity\_id": "INC-2026-000123",  
"details": {  
"classification": "internal\_damage",  
"destination": "internal\_loss",  
"client\_notified": "nestle\_mexico",  
"pdf\_hash": "a3f8c92e7d...",  
"recipients": \["[calidad@nestle.com.mx](mailto:calidad@nestle.com.mx)"\]  
},  
"immutable": true  
}

---

**9\. Métricas y KPIs Sugeridos**

**Para Dashboard de Gerencia:**

1. **Tasa de incidencias por mes:** Total de anomalías reportadas / Total de movimientos.

2. **Tiempo promedio de resolución:** Desde creación de incidencia hasta cierre.

3. **Responsabilidad de daños:**

   * % Daño interno (culpa del 3PL).

   * % Daño de origen (culpa del cliente/proveedor).

   * % Daño externo (sin responsable claro).

4. **Tasa de notificaciones a cliente:** Cuántas incidencias requirieron notificación formal.

5. **Operadores con más reportes:** Identificar patrones (capacitación, problemas recurrentes).

**Para Auditoría:**

1. **Incidencias sin resolver \> 48 horas:** Alertas de cuellos de botella.

2. **Discrepancias de inventario recurrentes:** Bahías con más de 3 anomalías en 30 días.

---

**10\. Roadmap de Implementación**

**Fase 1: Alertas Básicas y Reporte Manual (MVP)**

* Terminal móvil: botón de reporte de anomalía con formulario básico.

* Módulo de Calidad: lista de incidencias y detalle con clasificación.

* Alertas en campana (rojas, amarillas, azules).

* Generación de Acta de Incidente en PDF.

**Tiempo estimado:** 3-4 sprints.

---

**Fase 2: Detección Automática de Discrepancias**

* Integración con módulo de Inventario 2D para conteos físicos.

* Alertas automáticas de discrepancias con umbral configurable.

* Flujo de ajuste de inventario con registro en Audit Trail.

**Tiempo estimado:** 2-3 sprints.

---

**Fase 3: Notificación Automatizada y Reportes Avanzados**

* Envío de correo electrónico automático al cliente.

* Integración con APIs de clientes (ej. SAP de Nestlé) para notificaciones EDI.

* Dashboard de métricas de anomalías para gerencia.

**Tiempo estimado:** 2 sprints.

---

**11\. Conclusión**

Este sistema de **Alertas de Anomalías y Notificación a Cliente** cierra la brecha crítica identificada por tu equipo. Ahora el WMS 4-GUARD no solo detecta y bloquea productos dañados, sino que:

1. Facilita el reporte inmediato desde terminal RF.

2. Clasifica responsabilidades de forma rigurosa.

3. Genera documentación legal para clientes y auditorías.

4. Mantiene trazabilidad inmutable de cada decisión.

**Este módulo transforma la gestión reactiva de incidentes en un protocolo proactivo, blindado y transparente.**