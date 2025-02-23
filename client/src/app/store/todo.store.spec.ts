import { TestBed } from '@angular/core/testing';
import { TodoStore } from './todo.store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TodoService } from '../core/services/todos/todos.service';
import { of } from 'rxjs';
import { Todo, TodoStatus } from '../shared/models/Todo';

describe('TodoStore', () => {
  const mockTodoList: Todo[] = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: `Todo ${index}`,
    description: `Description ${index}`,
    status: TodoStatus.Pending,
  }));

  const mockTodoService = {
    getTodos: jest.fn().mockReturnValue(
      of({
        data: mockTodoList,
        total: 10,
      })
    ),
    addTodo: jest.fn().mockReturnValue(of({})),
  };

  const setup = () => {
    TestBed.configureTestingModule({
      providers: [
        TodoStore,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    });

    return {
      store: TestBed.inject(TodoStore),
      todoService: TestBed.inject(TodoService),
    };
  };

  it('should call getTodos on initialization and return todos', () => {
    const { store, todoService } = setup();

    expect(todoService.getTodos).toHaveBeenCalledTimes(1);
    expect(store.todos()).toEqual(mockTodoList);
  });

  it('should call addTodo', () => {
    const { store, todoService } = setup();

    const newTodo: Todo = {
      id: 11,
      title: 'New Todo',
      description: 'New Description',
      status: TodoStatus.Pending,
    };

    store.addTodo(newTodo);

    expect(todoService.addTodo).toHaveBeenCalledWith(newTodo);
  });
});
