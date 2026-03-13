/**
 * Test 8.1: AuthModule — Application Layer (Use Case)
 */

import { IAuthService } from '../domain/IAuthService.js';
import { AuthUser } from '../domain/AuthUser.js';

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(email: string, pass: string): Promise<AuthUser> {
    const user = await this.authService.authenticate(email, pass);
    if (!user) {
      throw new Error('AUTH_FAILED: Invalid credentials');
    }
    return user;
  }
}
