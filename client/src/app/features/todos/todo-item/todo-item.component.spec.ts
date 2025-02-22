import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    fixture.componentRef.setInput('title', 'Task 1');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.nativeElement.querySelector(
      '[data-testid="todo-item-title"]'
    );

    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Task 1');
  });

  it('should emit toggle status', () => {
    jest.spyOn(component.changeStatus, 'emit');

    const statusButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-item-status"]'
    );

    expect(statusButton).toBeTruthy();
    statusButton.click();

    expect(component.changeStatus.emit).toHaveBeenCalled();
  });

  it('should have an edit button', () => {
    const editButton = fixture.nativeElement.querySelector(
      '[data-testid="todo-item-edit-button"]'
    );

    expect(editButton).toBeTruthy();
    expect(editButton.textContent).toContain('Edit');
  });
});
