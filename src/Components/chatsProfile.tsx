import React, { useEffect, useState } from "react";
import { chatType, userType } from "../utills/Types";
import { getUserInfo, iCreatedChat } from "../Backend/Queries";
import { toastErr } from "../utills/toast";
import UserHeaderProfile from "./UserHeaderProfile";
import { defaultUser } from "../Redux/userSlice";
import { AppDispatch, RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedChat, setRightSidebarOpen } from "../Redux/chatsSlice";

type ChatsProfileType = {
  userId?: string;
  chat: chatType;
};

function ChatsProfile({ userId, chat }: ChatsProfileType) {
  const [UserLoading, setUsersLoading] = useState(false);
  const [chatUser, setChatUser] = useState<userType>(defaultUser);
  const dispatch = useDispatch<AppDispatch>();
  const currentSelectedChat = useSelector ((state:RootState) => state.chat.currentSelectedChat)
  // destrusturing data from the chat object
  const {
    id: chatId,
    senderId,
    lastMsg,
    senderToRecieverNewMsgCount,
    recieverToSenderNewMsgCount,
  } = chat;
  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const usr = await getUserInfo(userId, setUsersLoading);
        setChatUser(usr);
      } else toastErr("chatsProfile: user not found");
    };
    getUser();
    // indicates that any time the userId also changes the useeffect should run
  }, [userId]);
  const handleSelectedChats = () => {
    dispatch(
      setCurrentSelectedChat({
        ...chatUser,
        chatId,
        recieverToSenderNewMsgCount,
        senderToRecieverNewMsgCount,
      })
    );
    //close sidebar
    dispatch(setRightSidebarOpen())
  };
  return (
    <UserHeaderProfile
      handleClick={handleSelectedChats}
      user={chatUser}
      otherUser
      loading={UserLoading}
      lastmsg={lastMsg || "last message here"}
      newMsgCount={
        iCreatedChat(senderId)
          ? recieverToSenderNewMsgCount
          : senderToRecieverNewMsgCount
      }
      // if the userid of this profile(can be any profile) is thesame with the one selected
      isSelected ={userId=== currentSelectedChat.id}
    />
  );
}

export default ChatsProfile;
