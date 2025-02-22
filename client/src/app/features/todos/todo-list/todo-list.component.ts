import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router, RouterLink } from '@angular/router';
import { TodoStore } from '../../../store/todo.store';
import { TodoStatus } from '../../../../shared/models/Todo';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private router = inject(Router);
  private readonly store = inject(TodoStore);

  todos = this.store.todos;

  protected changeStatus(id: number, status: TodoStatus) {
    const updatedStatus =
      status === TodoStatus.Pending ? TodoStatus.Completed : TodoStatus.Pending;
    this.store.updateStatus(id, updatedStatus);
  }

  protected viewDetails(id: number) {
    this.router.navigate(['todos', id]);
  }
}
