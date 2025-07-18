import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router, RouterLink } from '@angular/router';
import { TodoStore } from '../../../store/todo.store';
import { TodoStatus } from '../../../shared/models/Todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterStatusPipe } from '../../../shared/pipes/filter-status.pipe';

@Component({
  selector: 'app-todo-list',
  imports: [
    TodoItemComponent,
    RouterLink,
    FormsModule,
    CommonModule,
    FilterStatusPipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
})
export class TodoListComponent {
  private router = inject(Router);
  private readonly store = inject(TodoStore);

  protected todos = this.store.todos;
  protected currentFilter = this.store.currentFilter;

  protected changeStatus(id: number, status: TodoStatus) {
    const updatedStatus =
      status === TodoStatus.Pending ? TodoStatus.Completed : TodoStatus.Pending;
    this.store.updateStatus(id, updatedStatus);
  }

  protected viewDetails(id: number) {
    this.router.navigate(['todos', id]);
  }

  protected filterTodos(event: TodoStatus | 'all') {
    this.store.setFilter(event);
  }
}
