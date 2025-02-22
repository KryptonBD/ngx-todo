export interface Todo {
  title: string;
  description?: string;
  status: TodoStatus;
}

export enum TodoStatus {
  Pending = 'pending',
  Completed = 'completed',
}
