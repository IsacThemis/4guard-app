/**
 * Test 8.1: AuthModule — Presentation Layer (Controller dummy)
 */

import { LoginUseCase } from '../application/LoginUseCase.js';

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async handleLogin(req: { body: any }): Promise<any> {
    // Note: In a real implementation with Blueprints, 
    // we would use a DTO/Schema instead of any in the request.
    // However, for this UAT test, we focus on the layer separation.
    try {
      const user = await this.loginUseCase.execute(req.body.email, req.body.password);
      return { status: 200, data: user };
    } catch (e: unknown) {
      const error = e as Error;
      return { status: 401, message: error.message };
    }
  }
}
