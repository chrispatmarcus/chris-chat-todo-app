import react, { forwardRef } from "react";
import { userType } from "../utills/Types";
import { Userloader } from "./Loaders";
import Truncate from "../utills/truncateText";

type Props = {
  user: userType;
  handleClick?: () => void;
  otherUser?: boolean;
  lastmsg?: string;
  loading?: boolean;
  newMsgCount?: number;
  isSelected?: boolean;
};
const UserHeaderProfile = forwardRef(
  (
    {
      user,
      handleClick,
      otherUser,
      lastmsg,
      loading,
      newMsgCount,
      isSelected,
    }: Props,
    ref: react.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return !loading && user ? (
      <div
        ref={ref}
        onClick={handleClick}
        className={`flex items-center space-x-4 cursor-pointer ${
          otherUser &&
          "group px-5 py-3 hover:bg-gray-200 border-b-[1px] border-gray-200"
        } ${isSelected && "bg-gray-200"}`}
      >
        <div className="relative">
          <img
            src={user.img}
            alt="user profile"
            className={`w-11 h-11 rounded-full ring-2  ring-white p-{2px} hover:shadow-lg ${
              otherUser ? "ring-gray-300" : "ring-white"
            } ${isSelected && "ring-gray-400"}`}
          />
          <span
            className={`-top-1 left-7 absolute w-4 h-4 border-2 border-gray-800 rounded-full ${
              user.isOnline ? "bg-green-400" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <div className="hidden md:block">
          <div
            className={`-mb-1 flex items-center gap-2 ${
              otherUser && "text-gray-600  group-hover:text-black "
            }${isSelected && "text-gray-900"}`}
          >
            {user.username}
            {newMsgCount && newMsgCount > 0 ? (
              <p
                className="bg-myPink w-auto min-w-[28px] h-6 p-2 rounded-full flex items-center justify-center
               text-white"
              >
                {newMsgCount}
              </p>
            ) : (
              ""
            )}
          </div>
          <div
            className={` text-sm text-gray-300" ${
              otherUser && "text-gray-400"
            } ${isSelected && "text-gray-500"}`}
          >
            {otherUser
              ? `${lastmsg ? Truncate(lastmsg) : "Last seen" + user.lastSeen}`
              : `joined in ${user.creationTime}`}
          </div>
        </div>
      </div>
    ) : (
      //call userloader
      <Userloader />
    );
  }
);

export default UserHeaderProfile;
