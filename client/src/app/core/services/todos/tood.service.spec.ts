import { TestBed } from '@angular/core/testing';
import { TodoService } from './todos.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TodoStatus } from '../../../shared/models/Todo';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    todoService = TestBed.inject(TodoService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpCtrl.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should send request to get todos', (done) => {
    const mockResponse = {
      data: [],
      total: 0,
    };

    todoService.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockResponse);
      done();
    });

    const req = httpCtrl.expectOne('/api/todos');
    req.flush(mockResponse);
  });

  it('should send request to add todo', (done) => {
    const mockTodo = {
      title: 'test',
      description: 'test',
      status: TodoStatus.Pending,
    };

    todoService.addTodo(mockTodo).subscribe((todos) => {
      expect(todos).toEqual({
        ...mockTodo,
        id: 1,
      });
      done();
    });

    const req = httpCtrl.expectOne('/api/todos');
    req.flush({
      ...mockTodo,
      id: 1,
    });
  });
});
