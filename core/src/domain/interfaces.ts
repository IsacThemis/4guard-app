import { ChronicleEntry, HealthStatus } from './entities.js';

export interface IChronicleRepository {
  save(entry: ChronicleEntry): Promise<void>;
  get(key: string): Promise<string | null>;
}

export interface IHealthService {
  check(): Promise<HealthStatus>;
}
