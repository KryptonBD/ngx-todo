import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo, TodoStatus } from '../../shared/models/Todo';
import { inject } from '@angular/core';
import { TodoService } from '../core/services/todos/todos.service';

type TodoState = {
  todos: Todo[];
  total: number;
};

const initialState: TodoState = {
  todos: [],
  total: 0,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    getTodos() {
      todoService.getTodos().subscribe((res) => {
        patchState(store, { todos: res.data, total: res.total });
      });
    },
    addTodo(todo: Omit<Todo, 'id'>) {},
    updateTodo(todo: Todo) {},
    deleteTodo(id: number) {},

    updateStatus(id: number, status: TodoStatus) {
      todoService.updateTodoStatus(id, { status }).subscribe((res) => {
        patchState(store, (state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, status };
            }
            return todo;
          }),
        }));
      });
    },
  })),

  withHooks({
    onInit(store) {
      store.getTodos();
    },
  })
);
