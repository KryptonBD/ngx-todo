import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Todo } from '../../../../shared/models/Todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  imports: [CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent {
  private router = inject(Router);
  protected todo = signal<Todo | null>(null);

  protected goBack() {
    this.router.navigate(['/']);
  }

  protected edit() {
    this.router.navigate(['todos', this.todo()?.id, 'edit']);
  }
}
