import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { TodoDetailsComponent } from './todo-details.component';

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetailsComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a back button', () => {
    const backButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-details-back-button"]'
    );
    expect(backButton).toBeTruthy();

    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    backButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show text if no todo found', () => {
    const noTodoText = fixture.nativeElement.querySelector(
      '[data-testid="todo-details-no-todo"]'
    );
    expect(noTodoText).toBeTruthy();
    expect(noTodoText.textContent).toContain('No Todo Found');
  });
});
