---
name: PolicyAuditDoc
description: Audits policy-as-code files (Rego/Cedar) and generates human-readable documentation matrices with risk analysis.
---

# PolicyAuditDoc Skill

## Overview

Esta skill transforma políticas de autorización escritas en Rego (OPA) o Cedar en documentación clara y auditable para personas con conocimiento del dominio del negocio, **sin requerir expertise técnico** en los lenguajes de políticas.

**Tipo**: Generativa  
**Idioma de salida**: Español neutro  
**Audiencia objetivo**: Auditores de negocio, compliance officers, revisores de seguridad no técnicos

## When to Use This Skill

- Cuando se solicite revisar o auditar políticas de autorización (Rego u OPA)
- Cuando se necesite documentación legible para auditores no técnicos de políticas Cedar
- Cuando se requiera una matriz de permisos o análisis de riesgos de un sistema policy-as-code
- Cuando un equipo legal o de compliance necesite entender qué acciones están permitidas/denegadas

## Pre-requisitos

- Contar con archivos de políticas en formato Rego (`.rego`) o Cedar (`.cedar`)
- Tener disponible el `project_name` y `domain_context` del sistema
- Opcional: notas de riesgo del agente (`agent_risk_notes`)

## Input/Output

### Esquema de Entrada (JSON)

```json
{
  "project_name": "string — nombre del proyecto auditado",
  "domain_context": "string — descripción breve del sistema y sus agentes",
  "policy_language": "rego | cedar | mixed",
  "policies": [
    {
      "id": "P1",
      "file_name": "editor_access.rego",
      "language": "rego",
      "content": "package example.authz\n..."
    }
  ],
  "agent_risk_notes": "string opcional — capacidades peligrosas del agente"
}
```

### Esquema de Salida (JSON)

```json
{
  "doc_title": "string",
  "sections": [
    { "id": 1, "title": "Contexto del sistema y alcance", "content": "..." },
    { "id": 2, "title": "Glosario básico", "content": "..." },
    { "id": 3, "title": "Modelo de evaluación de políticas", "content": "..." },
    { "id": 4, "title": "Resumen de políticas", "content": "..." },
    { "id": 5, "title": "Matriz de permisos", "content": "..." },
    {
      "id": 6,
      "title": "Análisis de riesgos y acciones sensibles",
      "content": "..."
    },
    { "id": 7, "title": "Checklist para auditoría humana", "content": "..." }
  ],
  "full_markdown": "string — concatenación completa en markdown"
}
```

## Workflow

### Step 1: Validar Entrada

- Verificar que `project_name`, `domain_context` y `policies` estén presentes
- Si `policies` está vacío → responder con error: _"No se encontraron políticas para analizar"_
- Detectar el lenguaje: si hay mezcla de Rego y Cedar, procesar cada uno según su modelo

### Step 2: Seleccionar Prompt de Usuario

- Si `policy_language == "rego"` → usar `prompts/user_rego.md`
- Si `policy_language == "cedar"` → usar `prompts/user_cedar.md`
- Si `policy_language == "mixed"` → procesar Rego y Cedar por separado, integrar resultados

### Step 3: Generar Documento

- Aplicar el sistema de prompts con el JSON de entrada
- Seguir la estructura de secciones 1–7 definida en `templates/audit_doc.md`
- Usar `prompts/glossary.md` para la sección 2
- Usar `prompts/checklist.md` para la sección 7

### Step 4: Marcar Acciones Sensibles

- Identificar explícitamente toda operación de borrado, escritura masiva, o acceso a datos sensibles
- Etiquetar como **"⚠️ Acción sensible"** en el análisis de riesgos

### Step 5: Validar Salida

- Verificar que el JSON de salida contiene todas las secciones 1–7
- Verificar que `full_markdown` es la concatenación correcta de todas las secciones
- Si falta alguna sección → completarla antes de responder

## Error Handling

| Error                            | Causa probable                                           | Resolución                                                                 |
| -------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| Políticas vacías o nulas         | El input no incluye contenido en `policies[].content`    | Solicitar los archivos de política al usuario                              |
| Lenguaje no reconocido           | `policy_language` con valor distinto de rego/cedar/mixed | Preguntar al usuario el lenguaje correcto                                  |
| JSON de entrada inválido         | Formato incorrecto                                       | Reportar el campo faltante y solicitar corrección                          |
| Política Rego malformada         | Sintaxis inválida en el contenido                        | Documentar el error de sintaxis y analizar lo que sea posible              |
| Conflicto permit/forbid en Cedar | Políticas contradictorias                                | Documentar el conflicto explícitamente en el análisis de riesgos           |
| Políticas recursivas             | Referencias circulares en Rego                           | Indicar la limitación y documentar el comportamiento esperado teóricamente |

## Ejemplos

Ver `examples/` para casos de referencia:

- `sample.rego.txt` + `sample.cedar.txt` — políticas de ejemplo
- `sample_audit_output.md` — salida completa de ejemplo

## Revision Checklist (Self-Evaluation)

**CRÍTICO:** Antes de devolver el resultado al usuario, **DEBES** verificar internamente tu propio output contra esta lista:

- [ ] ¿El frontmatter YAML de mi respuesta tiene errores y mi descripción del riesgo incluye advertencias claras si existen palabras como "delete" o "admin"?
- [ ] ¿Si el input incluye una política de tipo Cedar, he verificado y documentado si alguna regla `forbid` está anulando una regla `permit`?
- [ ] ¿He incluido la sección completa de "Checklist para auditoría humana" requerida por el output schema?

## Feedback & Self-Correction Mechanism

- Si descubres que **tu propio output falla en cualquiera de los puntos de la Revision Checklist**, **NO lo presentes al usuario**.
- Relanza tu proceso cognitivo, corrige la omisión y regenera el documento interno. Tienes permitido un máximo de 2 intentos de autocorrección.

## Dependencies

- No depende de otras skills
- Puede ser invocada por skills de compliance o seguridad para generar documentación automática

## Success Criteria

- [ ] El documento generado tiene exactamente 7 secciones
- [ ] Toda política del input aparece en el "Resumen de políticas"
- [ ] La matriz de permisos incluye todos los principals y acciones identificados
- [ ] Las acciones sensibles están marcadas explícitamente
- [ ] El JSON de salida es parseable sin errores
- [ ] El `full_markdown` no contiene placeholders sin completar como `{{variable}}`
