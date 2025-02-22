import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../../../../shared/models/Todo';

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
}
