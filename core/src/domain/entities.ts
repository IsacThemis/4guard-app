/**
 * TITAN Domain Entity: ChronicleEntry
 * Represents a piece of knowledge stored in ChronicleKeeper.
 */
export interface ChronicleEntry {
  key: string;
  value: string;
  metadata?: {
    timestamp: string;
    source?: string;
  };
}

/**
 * TITAN Blueprint: HealthStatus
 */
export interface HealthStatus {
  status: 'NOMINAL' | 'DEGRADED' | 'OFFLINE';
  components: {
    redis: string;
  };
}
