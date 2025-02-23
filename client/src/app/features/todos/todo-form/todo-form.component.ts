import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoStore } from '../../../store/todo.store';
import { Todo } from '../../../shared/models/Todo';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(TodoStore);

  private id = signal('');

  protected toDoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    status: new FormControl('pending'),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id.set(params['id']);
        const todo = this.store.getTodoById(+this.id());

        if (!todo) {
          this.goBack();
        }
        this.toDoForm.patchValue(todo!);
      }
    });
  }

  protected addTodo() {
    if (this.toDoForm.valid) {
      if (this.id()) {
        this.store.updateTodo(+this.id(), this.toDoForm.value as Todo);
        this.goBack();
        return;
      }

      this.store.addTodo(this.toDoForm.value as Todo);
      this.goBack();
    }
  }

  protected goBack() {
    if (this.id()) {
      this.router.navigate(['/todos', this.id()]);
      return;
    }

    this.router.navigate(['/']);
  }
}
