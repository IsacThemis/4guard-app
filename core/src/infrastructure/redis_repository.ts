import 'reflect-metadata';
import { createClient, RedisClientType } from 'redis';
import { injectable } from 'tsyringe';
import { IChronicleRepository } from '../domain/interfaces.js';
import { ChronicleEntry } from '../domain/entities.js';

@injectable()
export class RedisChronicleRepository implements IChronicleRepository {
  private client: RedisClientType;

  constructor(url: string = process.env.REDIS_URL ?? 'redis://localhost:6379') {
    this.client = createClient({ url });
    // Now throws so callers are forced to handle connection failures
    this.client.on('error', (err) => {
      throw new Error(`❌ Redis connection error: ${err instanceof Error ? err.message : String(err)}`);
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
      } catch (err) {
        throw new Error(`❌ Failed to connect to Redis: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  async save(entry: ChronicleEntry): Promise<void> {
    try {
      await this.client.set(entry.key, entry.value);
    } catch (err) {
      throw new Error(`❌ Redis save failed for key "${entry.key}": ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      throw new Error(`❌ Redis get failed for key "${key}": ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async ping(): Promise<string> {
    try {
      return await this.client.ping();
    } catch (err) {
      throw new Error(`❌ Redis ping failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
