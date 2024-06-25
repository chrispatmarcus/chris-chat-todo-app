import React from "react";
import { UsersLoader } from "./Loaders";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ChatsProfile from "./chatsProfile";
import { iCreatedChat } from "../Backend/Queries";

function Chats() {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return chats.length === 0 ? (
    <div className="p-10">
      no chats yet for you, chose a user and start chatting!
    </div>
  ) : (
    <>
      {chats.map((c) => (
        // provides the receiver id so that the profile of the people your chatting with will show in the page
        // or the sender id if your where not the one who started the chat
        <ChatsProfile chat={c} key={c.id} userId={iCreatedChat(c.senderId)? c.recieverId: c.senderId} />
      ))}
    </>
  );
}

export default Chats;
