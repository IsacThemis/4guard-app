/**
 * Test 8.1: AuthModule — Infrastructure Layer (Adapter)
 */

import { IAuthService } from '../domain/IAuthService.js';
import { AuthUser } from '../domain/AuthUser.js';

export class MockAuthService implements IAuthService {
  async authenticate(email: string, pass: string): Promise<AuthUser | null> {
    // Artificial logic for audit testing
    if (email === 'admin@titan.ai' && pass === 'secure') {
      return { id: '1', email, role: 'admin' };
    }
    return null;
  }
}
