import React, { useState } from 'react';

export type AddTodoFormProp = {
  addTodo: (id: string) => void;
};

export const AddTodoForm: React.FC<AddTodoFormProp> = ({ addTodo }) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue('');
    }
  };

  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        autoFocus
        type="text"
        value={value}
        onChange={handleTaskInput}
        className="todo-input"
        placeholder="What is the task today?"
        data-testid="add-task"
      />
      <button type="submit" className="todo-btn" data-testid="add-button">
        Add Task
      </button>
    </form>
  );
};
