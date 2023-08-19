import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { Method } from "axios";
import { nanoid } from "nanoid";

const fetcher = (
  url: string,
  { method, data }: { method: Method; data?: any }
) =>
  axios({
    url,
    method,
    baseURL: "http://localhost:3000/api",
    data,
  }).then((res) => res.data);

const TODO_QUERY_KEY = "todo";

export const useTodos = () => {
  const { data, error, isLoading } = useQuery([TODO_QUERY_KEY], () =>
    fetcher("todo", { method: "GET" })
  );

  return {
    todos: data,
    isLoading,
    isError: error,
  };
};

const generateId = () => nanoid();

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (todo: string) =>
      fetcher("todo", {
        method: "POST",
        data: {
          id: generateId(),
          todo,
          isCompleted: false,
          createdAt: new Date(),
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TODO_QUERY_KEY]);
      },
    }
  );

  return {
    addTodo: mutate,
  };
};

export const useRemoveTodo = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (todoId: string) =>
      fetcher(`todo/${todoId}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TODO_QUERY_KEY]);
      },
    }
  );

  return {
    removeTodo: mutate,
  };
};
