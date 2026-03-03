import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/pages/Home';

test('renders heading and demo tasks', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /welcome to todo app/i });
  expect(heading).toBeInTheDocument();

  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  expect(screen.getByText('Finish report')).toBeInTheDocument();
  expect(screen.getByText('Call Mom')).toBeInTheDocument();
});

test('toggles task completion', () => {
  render(<Home />);
  const toggleBtn = screen.getAllByLabelText('Mark complete');
  fireEvent.click(toggleBtn[0]);
  const taskText = screen.getByText('Buy groceries');
  expect(taskText).toHaveClass('line-through');
  expect(taskText).toHaveClass('text-gray-500');
});

test('reorders tasks via drag and drop', () => {
  render(<Home />);
  const items = screen
    .getAllByText(/.*/)
    .filter((el) => el.textContent?.trim());
  const first = items[0];
  const second = items[1];
  fireEvent.dragStart(first);
  fireEvent.dragOver(second);
  fireEvent.drop(second);
  const newOrder = screen
    .getAllByText(/.*/)
    .filter((el) => el.textContent?.trim());
  expect(newOrder[0]).toHaveTextContent('Finish report');
  expect(newOrder[1]).toHaveTextContent('Buy groceries');
});

test('adds a new task via modal', () => {
  render(<Home />);
  fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
  const input = screen.getByPlaceholderText('Task description');
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('modal visibility toggles', () => {
  render(<Home />);
  // modal not in DOM initially
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /add new task/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Cancel'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
