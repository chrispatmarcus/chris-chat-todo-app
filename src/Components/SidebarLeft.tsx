import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setIschatsTab } from "../Redux/chatsSlice";
import Chats from "./Chats";
import Users from "./Users";
import { BE_getAllUsers } from "../Backend/Queries";

type Props = {};

function SidebarLeft({}: Props) {
  const [UserLoading, setUsersLoading] = useState(false);
  const ischatsTab = useSelector((state: RootState) => state.chat.isChatsTab);
  const dispatch = useDispatch<AppDispatch>();

  const get = async () => {
    await BE_getAllUsers(dispatch, setUsersLoading);
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <Sidebar className={`flex-[0.5] absolute md:relative z-10 md:z-0  w-[80%] h-[80%] md:h-full md:w-full `}>
      <div className="flex flex-col">
        <div className="flex sticky top-0 z-10">
          <p
            onClick={() => dispatch(setIschatsTab(true))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer 
            ${
              ischatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            chats
          </p>

          <p
            onClick={() => dispatch(setIschatsTab(false))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              !ischatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            users
          </p>
        </div>
        <div className=" flex flex-col py-2 h-[300px]  ">
          {ischatsTab ? <Chats /> : <Users loading={UserLoading} />}
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarLeft;
