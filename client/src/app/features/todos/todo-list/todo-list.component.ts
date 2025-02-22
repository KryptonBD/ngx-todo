import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo, TodoStatus } from '../../../../shared/models/Todo';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos: Todo[] = Array.from({ length: 10 }, (_, i) => ({
    title: `Todo ${i + 1}`,
    status: Math.random() > 0.5 ? TodoStatus.Completed : TodoStatus.Pending,
  }));
}
