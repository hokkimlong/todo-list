"use client";

import React, { useState } from "react";
import Input from "./Input";
import TodoItemList from "./ItemList";

import { useAddTodo, useRemoveTodo, useTodos } from "../services/todo";
import { Todo } from "../type";

type Props = {};

const TodoList = (props: Props) => {
  const { todos, addTodo, removeTodo } = useTodoList();
  const { inputValue, setInputValue } = useTodoInput();
  const [editing, setEditing] = useState<Todo | null>(null);

  return (
    <div>
      <h1>Todos</h1>
      <TodoItemList
        onRemove={(item) => {
          removeTodo(item.id);
        }}
        onEdit={(item) => {
          setInputValue(item.todo);
          setEditing(item);
        }}
        items={todos}
      />
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onEnter={() => {
          if (editing) {
            addTodo(inputValue);
          } else {
            addTodo(inputValue);
          }

          setInputValue("");
          return;
        }}
      />
    </div>
  );
};

const useTodoList = () => {
  const { todos } = useTodos();
  const { addTodo } = useAddTodo();
  const { removeTodo } = useRemoveTodo();

  return { todos, addTodo, removeTodo };
};

const useTodoInput = () => {
  const [inputValue, setInputValue] = useState("");

  return { inputValue, setInputValue };
};

export default TodoList;
