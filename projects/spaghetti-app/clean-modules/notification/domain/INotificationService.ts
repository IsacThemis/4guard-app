/**
 * WCT-02: NotificationService — Domain Layer
 * ─────────────────────────────────────────────────────────────────
 * Under Quarantine Directive: This module must remain 100% isolated.
 */

export interface Notification {
  readonly id: string;
  readonly message: string;
  readonly type: 'info' | 'error' | 'success';
}

export interface INotificationService {
  send(notification: Notification): Promise<void>;
}
