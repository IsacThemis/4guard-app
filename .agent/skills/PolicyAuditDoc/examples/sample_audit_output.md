# Auditoría de Políticas — Demo (Mixed: Rego + Cedar)

**Proyecto**: DemoProject  
**Fecha**: 2026-03-05  
**Idioma de políticas**: mixed (Rego + Cedar)

---

## 1. Contexto del sistema y alcance

Este documento describe las políticas de autorización del proyecto **DemoProject**, un sistema de gestión de documentos para equipos internos. El análisis cubre 2 políticas:

- **P1** (Rego): Controla el acceso de editores a documentos propios.
- **P2** (Cedar): Controla el acceso de la usuaria "alice" a un documento específico del que es propietaria.

**Alcance**: Acceso a documentos. No se incluyen operaciones de administración del sistema ni gestión de usuarios.

---

## 2. Glosario básico

| Término             | Significado                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **Principal**       | Quién solicita la acción (usuario, rol, agente, servicio)                                |
| **Recurso**         | Sobre qué objeto se realiza la acción (documento, archivo, dataset, etc.)                |
| **Acción**          | Operación que se intenta realizar (leer, escribir, borrar, ejecutar)                     |
| **Efecto**          | Resultado de la evaluación: permitir (`allow`/`permit`) o denegar (`deny`/`forbid`)      |
| **Condición**       | Reglas adicionales que deben cumplirse para aplicar la política                          |
| **Default deny**    | Cuando no aplica ninguna política de permiso, el acceso es **denegado** por defecto      |
| **Acción sensible** | Operación con alto potencial de daño: borrado, modificación masiva, datos confidenciales |

---

## 3. Modelo de evaluación de políticas (mixed)

### Motor Rego (OPA)

OPA evalúa reglas top-down. Si existe `default allow = false`, cualquier solicitud que no active una regla `allow` es **denegada**. El conjunto de reglas `allow` funciona como una lista blanca explícita.

### Motor Cedar (AWS)

Cedar evalúa **todas** las políticas aplicables. Si alguna política `forbid` aplica, el acceso es **denegado** sin importar cuántas políticas `permit` existan. El principio de `forbid` tiene **precedencia absoluta** sobre `permit`.

---

## 4. Resumen de políticas

### P1 — Política Rego: `editor_access.rego`

**Descripción**: Permite que usuarios con rol `editor` modifiquen documentos de los que son propietarios.

| Campo     | Valor                                                            |
| --------- | ---------------------------------------------------------------- |
| Principal | Usuarios con rol `editor`                                        |
| Acción    | `edit_document`                                                  |
| Recurso   | Cualquier documento                                              |
| Condición | `resource.owner == principal.id` (el solicitante debe ser dueño) |
| Efecto    | `allow` (permiso)                                                |
| Default   | `deny` si no aplica ninguna regla                                |

### P2 — Política Cedar: `alice_view.cedar`

**Descripción**: Permite a la usuaria "alice" ver el documento `doc123` solo si es la propietaria.

| Campo     | Valor                                     |
| --------- | ----------------------------------------- |
| Principal | `User::"alice"` (usuaria específica)      |
| Acción    | `Action::"ViewDocument"`                  |
| Recurso   | `Document::"doc123"` (recurso específico) |
| Condición | `resource.owner == principal`             |
| Efecto    | `permit`                                  |

---

## 5. Matriz de permisos

| Principal / Rol          | Recurso            | Acción           | Permitido | Condiciones                                                     |
| ------------------------ | ------------------ | ---------------- | --------- | --------------------------------------------------------------- |
| `role=editor`            | Cualquier document | `edit_document`  | ✅ Sí     | Debe ser dueño del documento (`resource.owner == principal.id`) |
| `User::alice`            | `Document::doc123` | `ViewDocument`   | ✅ Sí     | `resource.owner == principal`                                   |
| Cualquier otro principal | Cualquier recurso  | Cualquier acción | ❌ No     | Sin regla aplicable → default deny                              |

---

## 6. Análisis de riesgos y acciones sensibles

En este ejemplo, **no hay acciones de borrado ni escritura masiva**. Sin embargo, se identifican las siguientes observaciones:

1. **Alcance de P1 amplio**: La política de editor aplica a _cualquier documento_, sin restricción de tipo o clasificación. Si existen documentos marcados como confidenciales, debería añadirse una condición adicional.

2. **P2 muy restringida por recurso**: La políticade Cedar limita el acceso a un documento específico (`doc123`), lo que es seguro pero puede requerir actualización frecuente si se agregan documentos.

3. **Edición de documentos**: Aunque no es una operación destructiva, puede considerarse **⚠️ acción sensible** si los documentos contienen información crítica del negocio.

**No se identifican operaciones de borrado, acceso masivo a datos ni escalada de privilegios** en las políticas analizadas.

---

## 7. Checklist para auditoría humana

- [ ] ¿Las políticas siguen el principio de "default deny" salvo excepciones muy justificadas?
- [ ] ¿Las acciones sensibles (borrado, escritura masiva, acceso a datos confidenciales) tienen condiciones estrictas?
- [ ] ¿Las políticas usan nombres de recursos y roles alineados con el dominio del proyecto?
- [ ] ¿Existe alguna política con alcance excesivamente amplio (por ejemplo, todos los recursos o todos los usuarios)? _(Ver observación P1)_
- [ ] ¿Las políticas que afectan a agentes con capacidades de destrucción o creación están claramente delimitadas?
- [ ] ¿Se han revisado ejemplos concretos de solicitudes permitidas y denegadas para cada política crítica?
- [ ] ¿La documentación refleja las notas de riesgo del agente (`agent_risk_notes`)?

---

_Documento generado por PolicyAuditDoc · Requiere revisión humana para validación final._
