import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../../../shared/models/Todo';

type TodoResponse = {
  data: Todo[];
  total: number;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<TodoResponse>('/api/todos');
  }

  updateTodoStatus(id: number, status: Pick<Todo, 'status'>) {
    return this.http.put(`/api/todos/${id}`, status);
  }

  addTodo(todo: Omit<Todo, 'id'>) {
    return this.http.post<Todo>('/api/todos', todo);
  }

  getTodoById(id: number) {
    return this.http.get<Todo>(`/api/todos/${id}`);
  }

  updateTodo(id: number, todo: Todo) {
    return this.http.put<Todo>(`/api/todos/${id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(`/api/todos/${id}`);
  }
}
