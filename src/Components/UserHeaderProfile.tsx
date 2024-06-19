import react from "react";
import { userType } from "../utills/Types";
import { Userloader } from "./Loaders";

type Props = {
  user: userType;
  handleClick?: () => void;
  otherUser?: boolean;
  lastmsg?: string;
  loading?: boolean;
};
function UserHeaderProfile({
  user,
  handleClick,
  otherUser,
  lastmsg,
  loading,
}: Props) {
  return !loading && user ? (
    <div
      onClick={handleClick}
      className="flex items-center space-x-4 cursor-pointer"
    >
      <div className="relative">
        <img
          src={user.img}
          alt="user profile"
          className={`w-11 h-11 rounded-full ring-2  ring-white p-{2px} hover:shadow-lg ${
            otherUser ? "ring-gray-300" : "ring-white"
          }`}
        />
        <span
          className="-top-1 left-7 absolute v-4 h-4 border-2 border-gray-800 rounded-full
    bg-green-400"
        ></span>
      </div>
      <div className="hidden md:block">
        <div className="-mb-1">{user.username}</div>
        <div
          className={` text-sm text-gray-300" ${otherUser && "text-gray-400"}`}
        >
          {otherUser
            ? `${lastmsg ? "lastmsg" : "Last seen" + user.lastSeen}`
            : `joined in ${user.creationTime}`}
        </div>
      </div>
    </div>
  ) : (
    //call userloader
    <Userloader />
  );
}

export default UserHeaderProfile;
