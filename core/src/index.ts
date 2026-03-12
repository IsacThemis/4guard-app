import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { RedisChronicleRepository } from "./infrastructure/redis_repository.js";
import { TITANHandlers } from "./presentation/handlers.js";

// 1. Initialize TITAN Architecture Layers
const repository = new RedisChronicleRepository();
await repository.connect();
const handlers = new TITANHandlers(repository);

const server = new Server({
  name: "Prometeo-TITAN-MCP-v4-TS",
  version: "4.0.0"
}, {
  capabilities: { tools: {} }
});

// 2. Register TITAN Tools Blueprint
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "nexus_check_health",
        description: "Verifica el estado del clúster y la conexión a bases de datos.",
        inputSchema: { type: "object", properties: {} }
      },
      {
        name: "nexus_remember",
        description: "Guarda un insight o contexto en la memoria a largo plazo (ChronicleKeeper).",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Identificador único (ej. 'insight_arquitectura')" },
            value: { type: "string", description: "El conocimiento a guardar" }
          },
          required: ["key", "value"]
        }
      },
      {
        name: "nexus_recall",
        description: "Recupera información de la memoria a largo plazo (ChronicleKeeper).",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "La clave de memoria a buscar" }
          },
          required: ["key"]
        }
      },
      {
        name: "nexus_compare_blueprint",
        description: "Compara el código actual contra un Enterprise Blueprint para detectar desviaciones.",
        inputSchema: {
          type: "object",
          properties: {
            blueprint_name: { type: "string", description: "Nombre del blueprint (ej. 'clean-architecture')" }
          },
          required: ["blueprint_name"]
        }
      }
    ]
  };
});

// 3. Command Dispatching with Port/Adapter Logic
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "nexus_check_health":
        return await handlers.handleHealthCheck();
      case "nexus_remember":
        return await handlers.handleRemember(args);
      case "nexus_recall":
        return await handlers.handleRecall(args);
      case "nexus_compare_blueprint":
        return await handlers.handleCompareBlueprint(args);
      default:
        throw new Error(`Tool '${name}' not found`);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `❌ TITAN Auto-Reparación Violation: ${errorMessage}` }],
      isError: true
    };
  }
});

// 4. Start STDIO Transport
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("🔥 TITAN MCP (TS Edition) v4.0.0 Online.");
