import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TodoService } from '../../../core/services/todos/todos.service';
import { TodoStatus } from '../../../shared/models/Todo';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title and description input', () => {
    const titleInput = fixture.nativeElement.querySelector(
      '[data-testid="todo-title-input"]'
    );
    const descriptionInput = fixture.nativeElement.querySelector(
      '[data-testid="todo-description-textarea"]'
    );

    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(titleInput.getAttribute('aria-label')).toBe('Todo Title');
  });

  it('should disable submit button if the form is invalid', () => {
    let submitButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-form-submit-button"]'
    );

    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBe(true);

    const titleInput = fixture.nativeElement.querySelector(
      '[data-testid="todo-title-input"]'
    ) as HTMLInputElement;
    titleInput.value = 'Todo title';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    submitButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-form-submit-button"]'
    );
    expect(submitButton.disabled).toBe(false);
  });

  it('should submit form', () => {
    const todoService = TestBed.inject(TodoService);
    jest.spyOn(todoService, 'addTodo');

    const titleInput = fixture.nativeElement.querySelector(
      '[data-testid="todo-title-input"]'
    ) as HTMLInputElement;

    titleInput.value = 'Todo title';
    titleInput.dispatchEvent(new Event('input'));

    const descriptionInput = fixture.nativeElement.querySelector(
      '[data-testid="todo-description-textarea"]'
    ) as HTMLInputElement;

    descriptionInput.value = 'Todo description';
    descriptionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-form-submit-button"]'
    ) as HTMLButtonElement;
    submitButton.click();

    fixture.detectChanges();
    expect(todoService.addTodo).toHaveBeenCalledWith({
      title: 'Todo title',
      description: 'Todo description',
      status: TodoStatus.Pending,
    });
  });
});
