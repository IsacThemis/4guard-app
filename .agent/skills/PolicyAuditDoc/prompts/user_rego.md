# Instrucciones

Recibirás un JSON con la siguiente forma:

- `project_name`: nombre del proyecto.
- `domain_context`: descripción breve del sistema y agentes.
- `policy_language`: debe ser `"rego"`.
- `policies`: lista de objetos con `id`, `file_name`, `language`, `content` (el código Rego como string).
- `agent_risk_notes`: (opcional) notas sobre capacidades potencialmente peligrosas del agente.

## Tu tarea es:

### 1. Analizar las políticas Rego y extraer:

- Qué principal o rol se controla.
- Qué recursos se ven afectados.
- Qué acciones se permiten o deniegan.
- Condiciones relevantes (por ejemplo, propietario, etiquetas, entorno).
- Notar que `default allow = false` implica "default deny" global.

### 2. Generar un documento de auditoría con esta estructura exacta de secciones:

1. **Contexto del sistema y alcance**
2. **Glosario básico** (usar los términos del archivo `prompts/glossary.md`)
3. **Modelo de evaluación de políticas (Rego)** — explicar: el motor OPA evalúa reglas de arriba hacia abajo; si ninguna regla `allow` aplica, el acceso se deniega por defecto.
4. **Resumen de políticas** — una entrada por cada política del input.
5. **Matriz de permisos** — tabla con columnas: `Principal/Rol | Recurso | Acción | Permitido | Condiciones`
6. **Análisis de riesgos y acciones sensibles** — marcar con ⚠️ toda operación de borrado, escritura masiva, o acceso a datos confidenciales.
7. **Checklist para auditoría humana** (usar el archivo `prompts/checklist.md`)

### 3. Entregar la salida en el siguiente formato JSON:

```json
{
  "doc_title": "Auditoría de Políticas — [project_name]",
  "sections": [
    { "id": 1, "title": "Contexto del sistema y alcance", "content": "..." },
    { "id": 2, "title": "Glosario básico", "content": "..." },
    {
      "id": 3,
      "title": "Modelo de evaluación de políticas (Rego)",
      "content": "..."
    },
    { "id": 4, "title": "Resumen de políticas", "content": "..." },
    { "id": 5, "title": "Matriz de permisos", "content": "..." },
    {
      "id": 6,
      "title": "Análisis de riesgos y acciones sensibles",
      "content": "..."
    },
    { "id": 7, "title": "Checklist para auditoría humana", "content": "..." }
  ],
  "full_markdown": "# [doc_title]\n\n## 1. Contexto...\n..."
}
```

## Ejemplo de entrada

```json
{
  "project_name": "SistemaDocumentos",
  "domain_context": "Sistema interno de gestión de documentos para equipos de desarrollo.",
  "policy_language": "rego",
  "policies": [
    {
      "id": "P1",
      "file_name": "editor_access.rego",
      "language": "rego",
      "content": "package example.authz\n\ndefault allow = false\n\nallow {\n  input.principal.role == \"editor\"\n  input.action == \"edit_document\"\n  input.resource.owner == input.principal.id\n}"
    }
  ],
  "agent_risk_notes": "El agente puede editar contenido, pero no borrar archivos."
}
```

## Ejemplo de salida esperada (fragmento)

```json
{
  "doc_title": "Auditoría de Políticas — SistemaDocumentos",
  "sections": [
    {
      "id": 1,
      "title": "Contexto del sistema y alcance",
      "content": "Este documento describe las políticas de autorización del proyecto SistemaDocumentos, un sistema interno de gestión de documentos. El análisis cubre 1 política Rego que controla el acceso de editores a documentos."
    },
    {
      "id": 5,
      "title": "Matriz de permisos",
      "content": "| Principal/Rol | Recurso | Acción | Permitido | Condiciones |\n|---|---|---|---|---|\n| role=editor | document | edit_document | ✅ Sí | Debe ser dueño del documento (`resource.owner == principal.id`) |"
    }
  ],
  "full_markdown": "# Auditoría de Políticas — SistemaDocumentos\n\n## 1. Contexto del sistema y alcance\n\nEste documento describe las políticas..."
}
```

## Reglas de estilo

- Lenguaje directo, en español neutro.
- Frases cortas, sin jerga innecesaria.
- Sempre que identifiques una operación potencialmente peligrosa, márcala con **⚠️ Acción sensible**.
- No incluyas comentarios fuera del JSON en tu respuesta final.

# Entrada

```json
{{input_json}}
```

# Salida esperada

Devuelve únicamente un objeto JSON válido con las claves `doc_title`, `sections`, `full_markdown`. No agregues texto, comentarios ni markdown fuera del JSON.
