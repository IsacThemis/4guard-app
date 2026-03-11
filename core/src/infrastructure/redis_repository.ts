import { createClient, RedisClientType } from 'redis';
import { IChronicleRepository } from '../domain/interfaces.js';
import { ChronicleEntry } from '../domain/entities.js';

export class RedisChronicleRepository implements IChronicleRepository {
  private client: RedisClientType;

  constructor(url: string = 'redis://localhost:6379') {
    this.client = createClient({ url });
    this.client.on('error', (err) => console.error('❌ Redis Error:', err));
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async save(entry: ChronicleEntry): Promise<void> {
    await this.client.set(entry.key, entry.value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async ping(): Promise<string> {
    return await this.client.ping();
  }
}
