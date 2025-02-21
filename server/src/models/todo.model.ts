export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum TodoStatus {
  Pending = "pending",
  Completed = "completed",
}
