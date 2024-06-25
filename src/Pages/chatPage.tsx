import react from "react";
import SidebarLeft from "../Components/SidebarLeft";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import ChatArea from "../Components/ChatArea";
import SidebarRight from "../Components/SidebarRight";
const nochat = require("../Assets/nochat.jpg");

function Chatpage() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  return (
    <div className="h-full max-w-[1500px]  flex justify-between m-auto p-3">
      <SidebarLeft />
      {currentSelectedChat.id ? (
        <>
        <ChatArea />
        <SidebarRight  />
        
        </>
      ) : (
        <div className="hidden lg:block flex-[0.7] bg-white  shadow-md overflow-hidden">
          <img
            src={nochat}
            alt="no chat"
            className="w-full h-full object-contian"
          />
        </div>
      )}
    </div>
  );
}

export default Chatpage;
