import { Todo } from "@/features/todo/type";
import { NextRequest, NextResponse } from "next/server";
import todoService from "./service";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  const todos = await todoService.getTodos({ search });
  return NextResponse.json(todos, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body: Todo = await request.json();
  const foundTodo = await todoService.getTodo({ todo: body.todo });
  if (foundTodo) {
    return NextResponse.json(body, { status: 409 });
  }
  await todoService.createNewTodo(body);
  return NextResponse.json(null, { status: 200 });
}
