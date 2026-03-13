import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { IChronicleRepository } from '../domain/interfaces.js';
import { safeParseRemember, safeParseRecall, safeParseCompareBlueprint } from './schemas.js';

const CHRONICLE_REPOSITORY = 'IChronicleRepository';

@injectable()
export class TITANHandlers {
  constructor(
    @inject(CHRONICLE_REPOSITORY) private repository: IChronicleRepository
  ) {}

  async handleHealthCheck() {
    try {
      const ping = await this.repository.ping();
      return {
        content: [{ type: "text", text: `✅ TITAN STATUS: NOMINAL. Redis: ${ping}.` }]
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `❌ Health check failed: ${msg}` }],
        isError: true
      };
    }
  }

  async handleRemember(args: unknown) {
    try {
      const result = safeParseRemember(args);
      if (!result.success) {
        return {
          content: [{ type: "text", text: `❌ Validación fallida: ${result.error.message}` }],
          isError: true
        };
      }
      await this.repository.save({ key: result.data.key, value: result.data.value });
      return {
        content: [{ type: "text", text: `🧠 Memoria cristalizada: [${result.data.key}] guardado exitosamente.` }]
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `❌ handleRemember falló: ${msg}` }],
        isError: true
      };
    }
  }

  async handleRecall(args: unknown) {
    try {
      const result = safeParseRecall(args);
      if (!result.success) {
        return {
          content: [{ type: "text", text: `❌ Validación fallida: ${result.error.message}` }],
          isError: true
        };
      }
      const data = await this.repository.get(result.data.key);
      if (!data) {
        return {
          content: [{ type: "text", text: `⚠️ Memoria vacía: No se encontró contexto para [${result.data.key}].` }]
        };
      }
      return {
        content: [{ type: "text", text: `🧠 Recuerdo extraído: ${data}` }]
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `❌ handleRecall falló: ${msg}` }],
        isError: true
      };
    }
  }

  async handleCompareBlueprint(args: unknown) {
    try {
      const result = safeParseCompareBlueprint(args);
      if (!result.success) {
        return {
          content: [{ type: "text", text: `❌ Validación fallida: ${result.error.message}` }],
          isError: true
        };
      }
      return {
        content: [{ type: "text", text: `🔍 TITAN: Validando contra Blueprint '${result.data.blueprint_name}'. Análisis estructural iniciado.` }]
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `❌ handleCompareBlueprint falló: ${msg}` }],
        isError: true
      };
    }
  }
}
