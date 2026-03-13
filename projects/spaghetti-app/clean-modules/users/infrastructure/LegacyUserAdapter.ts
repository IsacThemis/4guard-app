/**
 * WCT-04: Legacy User Adapter — Infrastructure Layer (ACL)
 * ─────────────────────────────────────────────────────────────────
 * This is the Anti-Corruption Layer. It wraps the "dirty" legacy 
 * function and maps it to the clean domain interface.
 */

import { IUserRepository, User } from '../domain/IUserRepository.js';
// We import the legacy module here, in the infrastructure layer ONLY.
import * as legacyUtils from '../../../utils.js';

export class LegacyUserAdapter implements IUserRepository {
  async getById(id: string): Promise<User> {
    try {
      // Calling the "dirty" legacy function
      const rawData = (legacyUtils as any).getUserData(id);
      
      // MAPPING: Transforming 'dirty/raw' data into 'clean' domain entity
      return {
        id: String(rawData.id),
        fullName: String(rawData.name)
      };
    } catch (error) {
      throw new Error(`[ACL] Failed to fetch legacy user ${id}: ${error}`);
    }
  }
}
