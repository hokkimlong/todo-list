import React from "react";
import { Todo } from "../type";

import style from "./TodoItem.module.css";

export const TodoItem = ({
  disabled,
  item,
  onEdit,
  onRemove,
  onComplete,
}: {
  disabled?: boolean;
  item: Todo;
  onEdit: () => void;
  onRemove: () => void;
  onComplete: () => void;
}) => {
  return (
    <li
      className={style["TodoItem"]}
      style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
    >
      {item.todo}
      <button disabled={disabled} onClick={onComplete}>
        Mark as {item.isCompleted ? "Incomplete" : "Complete"}
      </button>
      <button disabled={disabled} onClick={onEdit}>
        Edit
      </button>
      <button disabled={disabled} onClick={onRemove}>
        Remove
      </button>
    </li>
  );
};
