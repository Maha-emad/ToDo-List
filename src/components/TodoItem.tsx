import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { TodoType } from './Todo';

type TodoItemProp = {
  task: TodoType;
  id: number;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
};

export const TodoItem: React.FC<TodoItemProp> = ({
  task: todo,
  id,
  deleteTodo,
  editTodo,
  toggleComplete
}) => {
  const handleCheckTask = () => {
    toggleComplete(todo.id);
  };

  const handleEditTodo = () => {
    editTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  return (
    <div className="TodoItem" data-testid={`todo-item-${id}`}>
      <p className={`${todo.isCompleted ? 'completed' : 'incompleted'}`}>
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon
          className="complete-icon"
          icon={faCheck}
          onClick={handleCheckTask}
          data-testid="complete-icon"
        />
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={handleEditTodo}
          data-testid="edit-icon"
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={handleDeleteTodo}
          data-testid="delete-icon"
        />
      </div>
    </div>
  );
};
