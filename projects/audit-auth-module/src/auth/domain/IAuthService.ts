/**
 * Test 8.1: AuthModule — Domain Port (Interface)
 */

import { AuthUser } from './AuthUser.js';

export interface IAuthService {
  authenticate(email: string, pass: string): Promise<AuthUser | null>;
}
