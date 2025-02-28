import { Pipe, PipeTransform } from '@angular/core';
import { Todo, TodoStatus } from '../models/Todo';

@Pipe({
  name: 'filterStatus',
})
export class FilterStatusPipe implements PipeTransform {
  transform(todos: Todo[], status: TodoStatus | 'all'): Todo[] {
    if (!todos || !todos.length) return [];
    if (status === 'all') {
      return todos;
    }

    return todos.filter((todo) => todo.status === status);
  }
}
