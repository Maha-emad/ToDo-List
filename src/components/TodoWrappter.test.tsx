import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('App should render without errors', () => {
  beforeAll(() => {
    render(<App />);
  });

  afterAll(() => {
    cleanup();
  });

  test('Add Todo contains input field and it has focus on mount', () => {
    const addTodoInput = screen.getByTestId('add-task');
    const addButton = screen.getByTestId('add-button');

    expect(addButton).toBeInTheDocument();
    expect(addTodoInput).toBeInTheDocument();
  });
});

describe('Todo list functionality should function as expected', () => {
  beforeEach(() => {
    render(<App />);

    const addTodoInput = screen.getByTestId('add-task');
    const addButton = screen.getByTestId('add-button');

    fireEvent.change(addTodoInput, {
      target: {
        value: 'New Task'
      }
    });

    fireEvent.click(addButton);
  });

  afterEach(() => {
    cleanup();
  });

  test('Should add Task to list when button is clicked', () => {
    const todoItem = screen.getByText('New Task');
    expect(todoItem).toBeInTheDocument();
  });

  test('Should edit task when edit icon is clicked', () => {
    const editIcon = screen.getByTestId('edit-icon');
    fireEvent.click(editIcon);

    const editTodoInput = screen.getByTestId('edit-todo-input');
    const editTodoButton = screen.getByTestId('edit-todo-button');

    fireEvent.change(editTodoInput, {
      target: {
        value: 'New Task 1'
      }
    });

    fireEvent.click(editTodoButton);

    const todoItem = screen.getByText('New Task 1');
    expect(todoItem).toBeInTheDocument();

    const oldTodoItem = screen.queryByText('New Task');
    expect(oldTodoItem).not.toBeInTheDocument();
  });

  test('Should toggle the task completed when edit icon is clicked', () => {
    const completeIcon = screen.getByTestId('complete-icon');
    fireEvent.click(completeIcon);

    expect(
      screen.getByText('New Task', {
        selector: '.completed'
      })
    ).toBeInTheDocument();
  });

  test('Should delete the task when delete button is clicked ', () => {
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });
});
