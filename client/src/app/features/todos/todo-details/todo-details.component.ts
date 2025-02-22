import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-details',
  imports: [CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(TodoStore);

  private todoId = signal('');
  protected todo = computed(() => this.store.getTodoById(+this.todoId()));

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.todoId.set(params['id']);
      }
    });
  }

  protected goBack() {
    this.router.navigate(['/']);
  }

  protected edit() {
    this.router.navigate(['todos', this.todoId(), 'edit']);
  }

  protected deleteTodo() {
    this.store.deleteTodo(+this.todoId());
    this.goBack();
  }
}
