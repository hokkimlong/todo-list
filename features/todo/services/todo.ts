import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { GenericAbortSignal, Method } from "axios";
import { useDebounce } from "@uidotdev/usehooks";

const fetcher = (
  url: string,
  {
    method,
    data,
    params,
    signal,
  }: {
    method: Method;
    data?: any;
    params?: any;
    signal?: GenericAbortSignal;
  }
) =>
  axios({
    url,
    method,
    baseURL: "http://localhost:3000/api",
    data,
    params,
    signal,
  }).then((res) => res.data);

const TODO_QUERY_KEY = "todo";

export const useTodos = (query?: { search?: string }) => {
  const debounceQuery = useDebounce(query, 300);
  return useQuery(
    [TODO_QUERY_KEY, debounceQuery],
    ({ signal }) =>
      fetcher("todo", { method: "GET", params: debounceQuery, signal }),
    {
      keepPreviousData: true,
    }
  );
};

export const addTodo = (todo: string) =>
  fetcher("todo", {
    method: "POST",
    data: {
      todo,
      isCompleted: false,
    },
  });

export const removeTodo = (todoId: number) =>
  fetcher(`todo/${todoId}`, {
    method: "DELETE",
  });

export const updateTodo = (
  todo: { id: number } & ({ todo: string } | { isCompleted: boolean })
) =>
  fetcher(`todo/${todo.id}`, {
    method: "PUT",
    data: todo,
  });
