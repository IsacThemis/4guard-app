# Plan: Completar Flujo de Recepción

## Objetivo
Implementar el flujo completo del módulo de recepción según especificaciones (REC-01 y REC-02)

## Estado Actual
- [x] Analizar implementación actual
- [x] Fase 1: Metadatos de Seguridad (REC-01 Paso 1)
- [x] Fase 2: Consola Unificada (REC-02)
- [x] Fase 3: Cierre condicional (100% cuadratura)

## Flujo Recepción - Especificación

```
1. Supervisor inicia → REC-01 Paso 1: Metadatos (Placas, Chofer, Sellos)
2. Validar Metadatos → REC-01 Paso 2: Escaneo
3. Escaneo SSCC → Buffer Status 10 (Gris)
4. Cuadratura → Status 20 (Bolsa/Amarillo)
5. Validación QM → Status 30 (Verde/Liberado)
6. Cierre Definitivo → Solo si 100% cuadratura
```

## Fases de Implementación

### Fase 1: Metadatos de Seguridad (REC-01 Paso 1)
- [ ] Crear componente de formulario de metadatos
- [ ] Campos: Placas, Transportista, Nombre Chofer, Sellos
- [ ] Integrar en flujo de /reception como paso 0

### Fase 2: Consola Unificada (REC-02)
- [ ] Crear nueva página /reception/unified o /reception/console
- [ ] Gráfico radial de cuadratura
- [ ] Tabla de recepciones en proceso
- [ ] Indicador de Status 10/20/30
- [ ] Estado de andenes

### Fase 3: Cierre Condicional
- [ ] Lógica de validación de cuadratura
- [ ] Botón "Cerrar" deshabilitado si scanned ≠ expected
- [ ] Tooltip con cantidad faltante

## Archivos a Modificar/Crear
1. `src/app/reception/page.tsx` - Agregar paso 0 (Metadatos)
2. `src/app/reception/unified/page.tsx` - Consola REC-02 (nuevo)
3. `src/components/reception/QuadratureGauge.tsx` - Componente gauge (nuevo)
