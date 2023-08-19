"use client";

import React, { useState } from "react";
import Input from "./Input";
import TodoItemList from "./ItemList";

import { useAddTodo, useRemoveTodo, useTodos } from "../services/todo";

type Props = {};

const TodoList = (props: Props) => {
  const { todos, addTodo, removeTodo } = useTodoList();
  const { inputValue, setInputValue } = useTodoInput();

  return (
    <div>
      <h1>Todos</h1>
      <TodoItemList
        onRemove={(item) => {
          removeTodo(item.id);
        }}
        onEdit={(item) => {
          setInputValue(item.todo);
        }}
        items={todos}
      />
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onEnter={() => {
          addTodo(inputValue);
          setInputValue("");
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
