import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Sidebar from "./Sidebar";

function SidebarRight() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const { email, id, img, isOnline, username, bio, lastSeen, creationTime } =
    currentSelectedChat;
  return (
    <Sidebar className="hidden lg:block" isRight>
      <div className="flex flex-col ">
        <div className=" bg-gray-200 flex h-16 justify-center items-center top-0 sticky">
          {username && (
            <p className="font-bold  text-xl">{currentSelectedChat.username}</p>
          )}
        </div>
        {id ? (
          <div className="p-10 flex flex-col gap-10 ">
            <div className="relative self-center">
              <img
                src={currentSelectedChat.img}
                alt={currentSelectedChat.username}
                className="w-20 h-20 md:w-48 md:h-48 rounded-full p-{2px} ring-2 ring-gray-300
      cursor-pointer hover:shadow-lg"
              />
              <span
                className={`absolute top-7 md:top-7 left-28 md:left-40 w-5 h-5 border-2 border-gray-800
      rounded-full  ${isOnline ? "bg-green-400":" bg-gray-400 "}`}
              ></span>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-gray-400 ">
                username:<span className="text-gray-900 ">{username}</span>
              </p>
              <hr />
              <p className="text-gray-400 ">
                email:<span className="text-gray-900 ">{email}</span>
              </p>
              <p className="text-gray-400 ">
                joined:<span className="text-gray-900 ">{creationTime}</span>
              </p>
              <p className="text-gray-400 ">
                Lastseen:<span className="text-gray-900 ">{lastSeen}</span>
              </p>
              <p className="text-gray-400 ">
                boi:<span className="text-gray-900 ">{bio}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="p-10 ">
            no chat selected yet select a chat to see user details
          </div>
        )}
      </div>
    </Sidebar>
  );
}

export default SidebarRight;
