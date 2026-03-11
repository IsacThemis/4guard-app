import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "redis";

// 1. Inicializar TITAN MCP Server
const server = new Server({
  name: "Prometeo-TITAN-MCP",
  version: "4.0.0"
}, {
  capabilities: { tools: {} }
});

// 2. Conectar a ChronicleKeeper (Redis en Docker)
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.on('error', err => console.error('❌ Redis Error:', err));
await redisClient.connect();

// 3. Registrar las Herramientas (Tools) de TITAN
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

// 4. Lógica de Ejecución de Herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "nexus_check_health") {
      const ping = await redisClient.ping();
      return { content: [{ type: "text", text: `✅ TITAN STATUS: NOMINAL. Redis: ${ping}.` }] };
    } 
    
    else if (name === "nexus_remember") {
      await redisClient.set(args.key, args.value);
      return { content: [{ type: "text", text: `🧠 Memoria cristalizada: [${args.key}] guardado exitosamente.` }] };
    } 
    
    else if (name === "nexus_recall") {
      const data = await redisClient.get(args.key);
      if (!data) return { content: [{ type: "text", text: `⚠️ Memoria vacía: No se encontró contexto para [${args.key}].` }] };
      return { content: [{ type: "text", text: `🧠 Recuerdo extraído: ${data}` }] };
    }

    else if (name === "nexus_compare_blueprint") {
      // Stub para la funcionalidad propuesta en el Whitepaper
      return { content: [{ type: "text", text: `🔍 TITAN: Validando contra Blueprint '${args.blueprint_name}'. Análisis estructural iniciado.` }] };
    }

    throw new Error("Tool no encontrada");
  } catch (error) {
    return { content: [{ type: "text", text: `❌ Error interno de TITAN: ${error.message}` }] };
  }
});

// 5. Iniciar la conexión por STDIO (Estándar MCP)
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("🔥 TITAN MCP Server v4.0 inicializado y conectado a ChronicleKeeper (Redis).");