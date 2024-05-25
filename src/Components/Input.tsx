import React from "react";
type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDowm?: (e: any) => void;
  disabled?: boolean;
};
const Input = ({
  type = "text",
  name,
  value,
  onChange,
  className,
  onKeyDowm,
  disabled,
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDowm}
      type={type}
      placeholder={`Enter ${name}`}
      disabled={disabled}
      className={`flex-1 placeholder-grey-300 bg-transparent px-3 py-1 border-2 border-grey-300 rounded-full ${className}`}
    />
  );
};

export default Input;
