import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    title: 'Ngx Todo',
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./features/todos/todo-form/todo-form.component').then(
        (c) => c.TodoFormComponent
      ),
    title: 'Ngx Todo - Add Todo',
  },
  {
    path: 'todos/:id',
    loadComponent: () =>
      import('./features/todos/todo-details/todo-details.component').then(
        (c) => c.TodoDetailsComponent
      ),
  },
  {
    path: 'todos/:id/edit',
    loadComponent: () =>
      import('./features/todos/todo-form/todo-form.component').then(
        (c) => c.TodoFormComponent
      ),
    title: 'Ngx Todo - Edit Todo',
  },
];
