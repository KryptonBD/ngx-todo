import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo, TodoStatus } from '../../../../shared/models/Todo';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItemComponent, RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private router = inject(Router);
  todos: Todo[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Todo ${i + 1}`,
    status: Math.random() > 0.5 ? TodoStatus.Completed : TodoStatus.Pending,
  }));

  protected changeStatus(id: number) {
    console.log(id);
  }

  protected viewDetails(id: number) {
    this.router.navigate(['todos', id]);
  }
}
