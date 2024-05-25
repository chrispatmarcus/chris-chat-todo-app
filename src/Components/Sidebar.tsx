import React from "react";

type Sidebartypes = {
  children?: JSX.Element;
  isRight?: boolean;
  className: string;
};

function Sidebar({ children, isRight, className }: Sidebartypes) {
  return (
    <div
      className={` bg-white  shadow-md border-2 overflow-scroll ${
        isRight ? "rounded-tr-3xl" : "rounded-br-3xl"
      }
        ${className}`}
    >
      {children}
    </div>
  );
}

export default Sidebar;
