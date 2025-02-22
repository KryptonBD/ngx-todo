import { Component, computed, input, output } from '@angular/core';
import { TodoStatus } from '../../../../shared/models/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  title = input.required<string>();
  status = input<TodoStatus>(TodoStatus.Pending);

  changeStatus = output();

  protected isCompleted = computed(
    () => this.status() === TodoStatus.Completed
  );

  protected toggleStatus() {
    this.changeStatus.emit();
  }
}
