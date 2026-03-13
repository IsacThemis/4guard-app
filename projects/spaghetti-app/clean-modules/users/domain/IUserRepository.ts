/**
 * WCT-04: User Domain — Domain Layer
 * ─────────────────────────────────────────────────────────────────
 * This interface defines how the application expects to interact 
 * with user data. It is PURE and does not know about the legacy
 * implementation details.
 */

export interface User {
  readonly id: string;
  readonly fullName: string;
}

export interface IUserRepository {
  /**
   * Retrieves a User by their ID.
   * Returns a clean 'User' object, shielding the domain from 'raw' legacy data.
   */
  getById(id: string): Promise<User>;
}
