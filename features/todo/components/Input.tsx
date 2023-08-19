import React, { KeyboardEventHandler } from "react";

type Props = {
  onEnter?: KeyboardEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ onEnter, ...props }: Props) => {
  return (
    <input
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          onEnter(e);
        }
      }}
      {...props}
    />
  );
};

export default Input;
