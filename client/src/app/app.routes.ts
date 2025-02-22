import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    title: 'Ngx Todo',
  },
];
