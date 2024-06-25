import React, { useState } from "react";
import Icon from "./icons";
import {
  BsFillSendFill,
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setRightSidebarOpen } from "../Redux/chatsSlice";
type Props = {};

function ChatArea({}: Props) {
  const [msg, setMsg] = useState("");
   const dispatch = useDispatch<AppDispatch>();
  // use for the currenselted username in the input field
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2 ">
      <div className="flex-1 border-2 border-black flex flex-col max-h-screen overflow-y-scroll shadow-inner gap-2 ">
        <div
          className="bg-gradient-to-r from-myBlue to-myPink text-white text-xs self-end max-w-md shadow-md
        py-3 px-3 rounded-t-full rounded-bl-full border-2 border-white"
        >
          my message
        </div>

        <div
          className="bg-gray-300   text-black text-xs self-start  max-w-md shadow-md
        py-3 px-3 rounded-t-full rounded-br-full border-2 border-white"
        >
          your message
        </div>
      </div>

      <div className="flex gap-1 md:gap-5">
        <div
          className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 
        border-2 border-e-gray-300"
        >
          <Icon
            IconName={BsFillPeopleFill}
            className="text-gray-500 block md:hidden "
            reduceOpacityOnHover={false}
            size={15}
            onClick={() => dispatch(setRightSidebarOpen())}
          />
          <Input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            name={` message to ${currentSelectedChat?.username}`}
            className="border-none outline-none text-sm  md:text-[15px]"
          />
          <Icon
            IconName={ImAttachment}
            className="text-gray-500 hidden md:block rotate-90  "
          />
          <Icon
            IconName={BsFillCameraFill}
            className="text-gray-500 hidden md:block   "
          />
        </div>
        <div className="flex items-center justify-center">
          <Icon IconName={BsFillSendFill} reduceOpacityOnHover={false} />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
