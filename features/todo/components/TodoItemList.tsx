import React from "react";
import { Todo } from "../type";
import { TodoItem } from "./TodoItem";

type Props = {
  fetching: boolean;
  disabled: boolean;
  items: Todo[];
  onEdit: (item: Todo) => void;
  onRemove: (item: Todo) => void;
  onMarkChange: (item: Todo) => void;
};

const TodoItemList = ({
  disabled,
  fetching,
  items,
  onEdit,
  onRemove,
  onMarkChange: onComplete,
}: Props) => {
  if (fetching) {
    return "Loading...";
  }

  if (items?.length === 0) {
    return "No result. Create a new one instead!";
  }
  return (
    <ul>
      {items?.map((item) => (
        <TodoItem
          disabled={disabled}
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onRemove={() => onRemove(item)}
          onComplete={() => onComplete(item)}
        />
      ))}
    </ul>
  );
};

export default TodoItemList;
