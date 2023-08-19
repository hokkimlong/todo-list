import { NextRequest, NextResponse } from "next/server";

export let todos = [
  {
    id: "sdf",
    todo: "Todo 1",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: "dfsd",
    todo: "Todo 2",
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: "dsfd",
    todo: "Todo 2",
    isCompleted: false,
    createdAt: new Date(),
  },
];

export const removeTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
};

export async function GET(request: NextRequest) {
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  todos.push(body);
  return NextResponse.json(todos, { status: 200 });
}
