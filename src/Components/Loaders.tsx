import React from "react";
type Props = {};

export function ListLoaders({}: Props) {
  return (
    <div className=" w-full flex flex-wrap gap-10 justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
        <SingleListLoaders key={l} />
      ))}
    </div>
  );
}

export function SingleListLoaders() {
  return (
    <div className="relative bg-gray-200  shadow rounded-md max-w-sm w-full">
      <div className="animate-pulse flex flex-col">
        <div className="h-14 bg-gray-300 rounded-t-md"></div>
        <div className="flex-1 space-y-3 p-10"></div>
      </div>
      <div className="absolute rounded-full animate-plus -bottom-4 -left-4 bg-gray-300 h-10 w-30"></div>
    </div>
  );
}

// loaders for left sided bar

export const UsersLoader = () => {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <Userloader key={s} />
      ))}
    </div>
  );
};

export const Userloader = () => {
  return (
    <div className="animate-pulse flex gap-2 items-cente px-5 py-3 border-b-[1px] border-gray-200">
      <div className="w-11 h-11 rounded-full bg-gray-300"></div>
      <div className="flex flex-col gap-2 w-[100%]">
        <div className="bg-gray-300 h-3 rounded-md"></div>
        <div className="bg-gray-300 h-3 rounded-md "></div>
      </div>
    </div>
  );
};

// loader for chat messages
export const MessagesLoader = () => {
  return (
    <div className="flex-1 overflow-scroll">
      {[1, 2, 3, 4, 5, 6].map((m) => (
        <SingleMessageLoader key={m} />
      ))}
    </div>
  );
};

const SingleMessageLoader = () => {
  return (
    <div className="animate-pulse flex flex-col gap-18">
      <div
        className="bg-gray-200 h-12 w-full rounded-t-full rounded-br-full  border-2 border-white
      self-start max-w-sm"
      ></div>
      <div
        className="bg-gray-300 h-12 w-full mb-5 rounded-t-full rounded-bl-full border-2 border-white
        self-end max-w-sm"
      ></div>
    </div>
  );
};
