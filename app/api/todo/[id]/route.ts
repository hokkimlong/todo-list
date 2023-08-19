import { NextRequest, NextResponse } from "next/server";
import { removeTodo, todos, updateTodo } from "../route";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  removeTodo(params.id);
  return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  updateTodo(params.id, await request.json());
  return NextResponse.json({ message: "success" }, { status: 200 });
}
