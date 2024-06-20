import React from "react";
import { Userloader, UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import UserHeaderProfile from "./UserHeaderProfile";
type UsersProptypes = {
  loading: boolean;
};

function Users({ loading }: UsersProptypes) {
  const users = useSelector((state: RootState) => state.user.users);
  const handleStartChat = () => {
    alert("start chat");
  };

  return loading ? (
    <UsersLoader />
  ) : (
    <FlipMove>
      {users.map((u) => (
        <UserHeaderProfile
          handleClick={handleStartChat}
          key={u.id}
          user={u}
          otherUser
        />
      ))}
    </FlipMove>
  );
}

export default Users;
