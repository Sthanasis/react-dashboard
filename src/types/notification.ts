export interface BaseNotification {
  type?: 'error';
  header: string;
  content: string;
}

export interface Notification extends BaseNotification {
  id: number;
}
