import React, { useState } from 'react';
import { TodoType } from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { AddTodoForm } from './AddTodoForm';
import { EditTodoForm } from './EditTodoForm';
import { TodoItem } from './TodoItem';

export const TodoWrapper: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const addTodo = (task: string) => {
    setTodoList([
      ...todoList,
      { id: uuidv4(), task, isCompleted: false, isEditing: false }
    ]);
  };
  const toggleComplete = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) =>
    setTodoList(todoList.filter((todo) => todo.id !== id));

  const editTodo = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task: string, id: string): void => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const isEditingTask = (): boolean => {
    return todoList.some((todo) => todo.isEditing);
  };

  const getFirstElementEditing = () => {
    const todo: TodoType | undefined = todoList.find(
      (todo: TodoType) => todo.isEditing
    );

    if (todo) {
      return <EditTodoForm editTodo={editTask} todo={todo} />;
    }

    return todoList.map((todo, idx) => (
      <TodoItem
        key={todo.id}
        id={idx}
        task={todo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleComplete={toggleComplete}
      />
    ));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      {isEditingTask() ? <> </> : <AddTodoForm addTodo={addTodo} />}
      {getFirstElementEditing()}
    </div>
  );
};
