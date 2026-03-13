import { ChronicleEntry, HealthStatus } from './entities.js';

export interface IChronicleRepository {
  connect(): Promise<void>;
  save(entry: ChronicleEntry): Promise<void>;
  get(key: string): Promise<string | null>;
  ping(): Promise<string>;
}

export interface IHealthService {
  check(): Promise<HealthStatus>;
}
