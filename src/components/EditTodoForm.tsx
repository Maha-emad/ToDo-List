import React, { useState } from 'react';
import { TodoType } from './Todo';

type EditTodoFormProps = {
  todo: TodoType;
  editTodo: (task: string, id: string) => void;
};

export const EditTodoForm: React.FC<EditTodoFormProps> = ({
  todo,
  editTodo
}) => {
  const [value, setValue] = useState(todo.task);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value, todo.id);
  };

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={handleTaskInput}
        className="todo-input"
        placeholder="Update task"
        data-testid="edit-todo-input"
      />
      <button type="submit" className="todo-btn" data-testid="edit-todo-button">
        Edit Task
      </button>
    </form>
  );
};
