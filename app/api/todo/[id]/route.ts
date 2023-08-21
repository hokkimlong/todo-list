import { NextRequest, NextResponse } from "next/server";
import todoService from "../service";
import { Todo } from "@/features/todo/type";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await todoService.removeTodo(params.id);
  return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: Todo = await request.json();

  const foundTodo = await todoService.getTodo({ todo: body.todo });
  if (foundTodo && foundTodo.id !== Number(params.id)) {
    return NextResponse.json(body, { status: 409 });
  }

  await todoService.updateTodo(body);
  return NextResponse.json({ message: "success" }, { status: 200 });
}
