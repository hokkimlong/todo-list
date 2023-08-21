import React, { KeyboardEventHandler } from "react";

type Props = {
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ onPressEnter, ...props }: Props) => {
  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter" && onPressEnter) {
            onPressEnter(e);
          }
        }}
        {...props}
      />
    </div>
  );
};

export default Input;
