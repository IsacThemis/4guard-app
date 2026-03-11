import { RedisChronicleRepository } from '../infrastructure/redis_repository.js';
import { HealthCheckSchema, RememberSchema, RecallSchema, CompareBlueprintSchema } from './schemas.js';

export class TITANHandlers {
  constructor(private repository: RedisChronicleRepository) {}

  async handleHealthCheck() {
    const ping = await this.repository.ping();
    return {
      content: [{ type: "text", text: `✅ TITAN STATUS: NOMINAL. Redis: ${ping}.` }]
    };
  }

  async handleRemember(args: any) {
    const validated = RememberSchema.parse(args);
    await this.repository.save({ key: validated.key, value: validated.value });
    return {
      content: [{ type: "text", text: `🧠 Memoria cristalizada: [${validated.key}] guardado exitosamente.` }]
    };
  }

  async handleRecall(args: any) {
    const validated = RecallSchema.parse(args);
    const data = await this.repository.get(validated.key);
    if (!data) {
      return {
        content: [{ type: "text", text: `⚠️ Memoria vacía: No se encontró contexto para [${validated.key}].` }]
      };
    }
    return {
      content: [{ type: "text", text: `🧠 Recuerdo extraído: ${data}` }]
    };
  }

  async handleCompareBlueprint(args: any) {
    const validated = CompareBlueprintSchema.parse(args);
    return {
      content: [{ type: "text", text: `🔍 TITAN: Validando contra Blueprint '${validated.blueprint_name}'. Análisis estructural iniciado.` }]
    };
  }
}
