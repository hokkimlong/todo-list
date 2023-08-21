"use client";

import React, { useState } from "react";
import Input from "./Input";
import TodoItemList from "./TodoItemList";

import { addTodo, removeTodo, updateTodo, useTodos } from "../services/todo";
import { Todo } from "../type";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const TodoList = () => {
  const {
    todos,
    inputValue,
    setInputValue,
    handleRemove,
    handleEdit,
    handleMarkChange,
    editingTodo,
    handlePressEnter,
    fetching,
    mutating,
  } = useTodoList();

  return (
    <div>
      <h1>Todos</h1>
      <TodoItemList
        fetching={fetching}
        disabled={mutating}
        onRemove={handleRemove}
        onEdit={handleEdit}
        onMarkChange={handleMarkChange}
        items={todos}
      />

      {editingTodo && `Editing : ${editingTodo.todo}`}
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onPressEnter={handlePressEnter}
      />
    </div>
  );
};

const useTodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const {
    data: todos,
    refetch,
    isLoading,
  } = useTodos({
    search: !editingTodo ? inputValue : "",
  });

  const { mutateAsync: addTodoMutateAsync, isLoading: addTodoMutating } =
    useMutation(addTodo);
  const { mutate: removeTodoMutate, isLoading: removeTodoMutating } =
    useMutation(removeTodo, {
      onSuccess: refetch,
    });
  const { mutateAsync: updateTodoMutateAsync, isLoading: updateTodoMutating } =
    useMutation(updateTodo, {
      onSuccess: refetch,
    });

  const handleRemove = (item: Todo) => {
    removeTodoMutate(item.id);
    setEditingTodo(null);
  };
  const handleEdit = (item: Todo) => {
    setInputValue(item.todo);
    setEditingTodo(item);
  };
  const handleMarkChange = async (item: Todo) => {
    await updateTodoMutateAsync({
      ...item,
      isCompleted: !item.isCompleted,
    });
  };

  const handlePressEnter = async () => {
    const newTodo = inputValue.trim();
    if (newTodo.length === 0) {
      return;
    }

    try {
      if (editingTodo) {
        await updateTodoMutateAsync({ ...editingTodo, todo: newTodo });
        setEditingTodo(null);
      } else {
        await addTodoMutateAsync(newTodo);
      }

      setInputValue("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert(`Duplicate item : ${newTodo}`);
        }
      }
    }
  };

  return {
    handleEdit,
    handleMarkChange,
    handleRemove,
    editingTodo,
    todos,
    inputValue,
    setInputValue,
    handlePressEnter,
    fetching: isLoading,
    mutating: addTodoMutating || updateTodoMutating || removeTodoMutating,
  };
};

export default TodoList;
