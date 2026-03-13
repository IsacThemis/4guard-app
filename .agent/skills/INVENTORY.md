# Inventario Central de Skills (Prometeo TITAN)

## Catálogo Actual

| Skill Name | Path | Categoría |
| ---------- | ---- | --------- |
| `blueprint-clean-architecture` | `.agent/skills/BLUEPRINTS/clean-architecture/SKILL.md` | Blueprint Arquitectura |
| `PolicyAuditDoc` | `.agent/skills/PolicyAuditDoc/SKILL.md` | Gobernanza |
| `RuleSynthesizer` | `.agent/skills/RuleSynthesizer/SKILL.md` | Gobernanza |
| `notebooklm` | `.agent/skills/notebooklm-skill/SKILL.md` | MCP / RAG |
| `planning-with-files` | `.agent/skills/planning-with-files/SKILL.md` | Workflow |
| `skillx` | `.agent/skills/skillx/SKILL.md` | Core / Meta |
| `using-superpowers` | `.agent/skills/using-superpowers/SKILL.md` | Core / Meta |

## Análisis de Duplicados & Consolidación

1.  **Duplicidad Funcional:** No se detectaron alias directos ni skills duplicadas funcionalmente.
2.  **Consolidación Propuesta:** 
    *   `skillx` y `using-superpowers`: Ambas actúan en el dominio meta del agente. Se mantendrán separadas (una ejecuta CLI, la otra dicta política de prompt), pero se recomienda que `using-superpowers` referencie a `skillx` como el motor de ejecución preferido.
    *   El directorio `WORKFLOW` no contiene un archivo `SKILL.md`, sino un `governance-protocol.md`. Debería asimilarse como contexto o convertirse en Skill si requiere invocación activa.

## Plan de Migración (Frontmatter Patch)

Se aplicará un parche a todos los archivos `SKILL.md` para unificar el frontmatter con los siguientes campos estandarizados (con valores defaults según aplique):
```yaml
name: [Nombre]
description: [Descripción]
user-invocable: true
allowed-tools: "*"
version: "1.0.0"
```
