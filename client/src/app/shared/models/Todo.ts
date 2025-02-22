export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
}

export enum TodoStatus {
  Pending = 'pending',
  Completed = 'completed',
}
