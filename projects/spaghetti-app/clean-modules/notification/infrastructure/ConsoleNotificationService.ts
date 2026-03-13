/**
 * WCT-02: NotificationService — Infrastructure Layer
 */

import { INotificationService, Notification } from '../domain/INotificationService.js';

export class ConsoleNotificationService implements INotificationService {
  async send(n: Notification): Promise<void> {
    const icon = n.type === 'error' ? '❌' : n.type === 'success' ? '✅' : 'ℹ️';
    console.log(`[QUARANTINE-SAFE] ${icon} ${n.message} (id: ${n.id})`);
  }
}
