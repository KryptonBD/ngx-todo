import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../../core/services/todos/todos.service';
import { of } from 'rxjs';

describe('TodoListComponent without Todos', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have add todo link', () => {
    const addTodoLink = fixture.nativeElement.querySelector(
      "[data-testid='add-todo']"
    );

    expect(addTodoLink).toBeTruthy();
    expect(addTodoLink.textContent).toContain('Add Todo');
  });

  it('should have a todo filter', () => {
    const todoFilter = fixture.nativeElement.querySelector(
      "[data-testid='todo-filter']"
    );

    expect(todoFilter).toBeTruthy();

    const todoFilterOptions = todoFilter.querySelectorAll('option');
    expect(todoFilterOptions.length).toBe(3);
  });

  it("should show there's no todo message", () => {
    const noTodoMessage = fixture.nativeElement.querySelector(
      "[data-testid='todo-list-empty']"
    );

    expect(noTodoMessage).toBeTruthy();
    expect(noTodoMessage.textContent).toContain('No Todo Yet');
  });
});

describe('TodoListComponent with Todos', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodos = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Todo ${i + 1}`,
    description: `Description ${i + 1}`,
    status: i % 2 === 0 ? 'completed' : 'pending',
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: TodoService,
          useValue: {
            getTodos: () =>
              of({
                data: mockTodos,
                total: 10,
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should should show list of todos', () => {
    const todosElements =
      fixture.nativeElement.querySelectorAll('app-todo-item');

    expect(todosElements).toBeTruthy();
    expect(todosElements.length).toBeGreaterThanOrEqual(10);
  });

  it('should filter by status', () => {
    const todoFilter = fixture.nativeElement.querySelector(
      "[data-testid='todo-filter']"
    );
    const todoFilterOptions = todoFilter.querySelectorAll('option');
    todoFilterOptions[1].selected = true;
    todoFilter.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const todosElements =
      fixture.nativeElement.querySelectorAll('app-todo-item');

    const pendingTodos = mockTodos.filter((todo) => todo.status === 'pending');

    expect(todosElements.length).toBe(pendingTodos.length);
  });
});
