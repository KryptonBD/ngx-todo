import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private id = signal('');

  protected toDoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('pending'),
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id.set(params['id']);
      }
    });
  }

  protected addTodo() {
    if (this.toDoForm.valid) {
      console.log(this.toDoForm.value);
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
