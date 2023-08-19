import { NextRequest, NextResponse } from "next/server";
import { removeTodo, todos } from "../route";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  removeTodo(params.id);
  return NextResponse.json({ message: "success" }, { status: 200 });
}
