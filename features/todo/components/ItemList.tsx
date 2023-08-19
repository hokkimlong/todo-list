import React from "react";
import { Todo } from "../type";

type Props = {
  items: Todo[];
  onEdit: (item: Todo) => void;
  onRemove: (item: Todo) => void;
};

const TodoItemList = ({ items, onEdit, onRemove }: Props) => {
  return (
    <ul>
      {items?.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onRemove={() => onRemove(item)}
        />
      ))}
    </ul>
  );
};

const TodoItem = ({
  item,
  onEdit,
  onRemove,
}: {
  item: Todo;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  return (
    <li>
      {item.todo} <button onClick={onEdit}>edit</button>
      <button onClick={onRemove}>x</button>
    </li>
  );
};

export default TodoItemList;
