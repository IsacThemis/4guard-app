/**
 * Test 8.1: AuthModule — Domain Entity
 */

export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly role: 'admin' | 'user';
}
