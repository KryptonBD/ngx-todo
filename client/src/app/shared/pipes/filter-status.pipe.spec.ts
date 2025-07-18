import { Todo, TodoStatus } from '../models/Todo';
import { FilterStatusPipe } from './filter-status.pipe';

describe('FilterStatusPipe', () => {
  let pipe: FilterStatusPipe;
  const mockTodos = Array.from(
    { length: 10 },
    (_, i) =>
      ({
        id: i + 1,
        title: `Todo ${i + 1}`,
        description: `Description ${i + 1}`,
        status: i % 2 === 0 ? 'completed' : 'pending',
      } as Todo)
  );

  beforeEach(() => {
    pipe = new FilterStatusPipe();
  });

  it('should all todos when status is set to all', () => {
    const filteredTodos = pipe.transform(mockTodos, 'all');
    expect(filteredTodos.length).toBe(10);
  });

  it('should filter todos by status when status is set to completed', () => {
    const completedTodos = mockTodos.filter(
      (todo) => todo.status === 'completed'
    );
    const filteredTodos = pipe.transform(mockTodos, TodoStatus.Completed);

    expect(filteredTodos.length).toBe(completedTodos.length);
    expect(filteredTodos.every((todo) => todo.status === 'completed')).toBe(
      true
    );
  });
});
