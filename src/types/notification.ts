export type Notification = {
  id: number;
  type: 'success' | 'error' | 'info';
  header: string;
  content: string;
};
