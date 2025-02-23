import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
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
});
