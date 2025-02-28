import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { TodoService } from '../core/services/todos/todos.service';
import { Todo, TodoStatus } from '../shared/models/Todo';

type TodoState = {
  todos: Todo[];
  total: number;
  currentFilter: TodoStatus | 'all';
};

const initialState: TodoState = {
  todos: [],
  total: 0,
  currentFilter: 'all',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    getTodos() {
      todoService.getTodos().subscribe((res) => {
        patchState(store, {
          todos: res.data,
          total: res.total,
        });
      });
    },

    addTodo(todo: Omit<Todo, 'id'>) {
      todoService.addTodo(todo).subscribe((res) => {
        patchState(store, (state) => ({
          todos: [...state.todos, res],
          total: state.total + 1,
        }));
      });
    },

    updateTodo(id: number, todo: Todo) {
      todoService.updateTodo(id, todo).subscribe((res) => {
        patchState(store, (state) => ({
          todos: state.todos.map((t) => (t.id === id ? res : t)),
        }));
      });
    },

    deleteTodo(id: number) {
      todoService.deleteTodo(id).subscribe((res) => {
        patchState(store, (state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          total: state.total - 1,
        }));
      });
    },

    getTodoById(id: number) {
      let todo = store.todos().find((todo) => todo.id === id);

      if (!todo) {
        todoService.getTodoById(id).subscribe((res) => {
          patchState(store, (state) => ({
            todos: [...state.todos, res],
          }));
          todo = res;
        });
      }

      return todo;
    },

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

    setFilter(status: TodoStatus | 'all') {
      patchState(store, () => ({
        currentFilter: status,
      }));
    },
  })),

  withHooks({
    onInit(store) {
      store.getTodos();
    },
  })
);
