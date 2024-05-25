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

  useEffect(() => {
    const get = async () => {
      await BE_getAllUsers(dispatch, setUsersLoading);
    };
  }, []);
  return (
    <Sidebar className={`flex-[0.0] w-[80%] h-[80%]`}>
      <div className="flex">
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
              ischatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            users
          </p>
        </div>
        <div className="flex-1 flex-col py-2 max-full overflow-scroll">
          {ischatsTab ? <Chats /> : <Users loading={UserLoading} />}
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarLeft;
