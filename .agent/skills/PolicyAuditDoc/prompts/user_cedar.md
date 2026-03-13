# Instrucciones

Recibirás un JSON con políticas en lenguaje Cedar.

- `project_name`: nombre del proyecto.
- `domain_context`: descripción breve del sistema y agentes.
- `policy_language`: debe ser `"cedar"`.
- `policies`: lista de objetos con `id`, `file_name`, `language`, `content` (el código Cedar como string).
- `agent_risk_notes`: (opcional) notas sobre capacidades potencialmente peligrosas del agente.

## Tu tarea es:

### 1. Analizar las políticas Cedar, identificando:

- `principal` — quién realiza la acción (User, Group, Role, Service...)
- `action` — qué operación se realiza
- `resource` — sobre qué objeto
- Condiciones en bloques `when { ... }` o `unless { ... }`
- El efecto: `permit` o `forbid` (recordar que **`forbid` tiene precedencia sobre `permit`**)

### 2. Generar un documento de auditoría con esta estructura exacta:

1. **Contexto del sistema y alcance**
2. **Glosario básico** (usar los términos del archivo `prompts/glossary.md`)
3. **Modelo de evaluación de políticas (Cedar)** — explicar: Cedar evalúa todas las políticas y combina `permit` y `forbid`; si hay un `forbid` aplicable, niega el acceso sin importar cuántos `permit` existan.
4. **Resumen de políticas** — una entrada por cada política del input.
5. **Matriz de permisos** — tabla con columnas: `Principal | Recurso | Acción | Efecto | Condiciones`
6. **Análisis de riesgos y acciones sensibles** — marcar con ⚠️ toda operación destructiva o de acceso sensible.
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
      "title": "Modelo de evaluación de políticas (Cedar)",
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
  "project_name": "PortalDocumentos",
  "domain_context": "Portal web de gestión de documentos corporativos.",
  "policy_language": "cedar",
  "policies": [
    {
      "id": "P1",
      "file_name": "alice_view.cedar",
      "language": "cedar",
      "content": "permit(\n  principal == User::\"alice\",\n  action == Action::\"ViewDocument\",\n  resource == Document::\"doc123\"\n) when {\n  resource.owner == principal\n};"
    }
  ],
  "agent_risk_notes": ""
}
```

## Ejemplo de salida esperada (fragmento)

```json
{
  "doc_title": "Auditoría de Políticas — PortalDocumentos",
  "sections": [
    {
      "id": 1,
      "title": "Contexto del sistema y alcance",
      "content": "Este documento describe las políticas de autorización del proyecto PortalDocumentos, un portal web de gestión de documentos corporativos. Se analiza 1 política Cedar."
    },
    {
      "id": 5,
      "title": "Matriz de permisos",
      "content": "| Principal | Recurso | Acción | Efecto | Condiciones |\n|---|---|---|---|---|\n| User::alice | Document::doc123 | ViewDocument | ✅ permit | `resource.owner == principal` |"
    }
  ],
  "full_markdown": "# Auditoría de Políticas — PortalDocumentos\n\n## 1. Contexto del sistema y alcance\n\nEste documento describe..."
}
```

## Reglas de estilo

- Lenguaje directo, en español neutro.
- Frases cortas, sin jerga innecesaria.
- Marcar con **⚠️ Acción sensible** toda operación que pueda causar daño significativo.
- Los conflictos `permit` vs. `forbid`: documentarlos explícitamente en el análisis de riesgos.
- No incluyas comentarios fuera del JSON en tu respuesta final.

# Entrada

```json
{{input_json}}
```

# Salida esperada

Devuelve únicamente un objeto JSON válido con las claves `doc_title`, `sections`, `full_markdown`. No agregues texto, comentarios ni markdown fuera del JSON.
