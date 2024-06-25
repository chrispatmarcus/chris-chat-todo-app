import React from "react";
import { Userloader, UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import UserHeaderProfile from "./UserHeaderProfile";
import { setAlertProps } from "../Redux/userSlice";
type UsersProptypes = {
  loading: boolean;
};

function Users({ loading }: UsersProptypes) {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<AppDispatch>()
  const handleStartChat = (reciever_id:string, reciever_name:string) => {
    // sets the alertprop:open to be true, recieveeid to the recieverid and recievername to receivername
    // and dispatches it to the user interface
    dispatch(setAlertProps({open:true, recieverId:reciever_id, recieverName:reciever_name}));
  };

  return loading ? (
    <UsersLoader />
  ) : (
    <FlipMove>
      {users.map((u) => (
        <UserHeaderProfile
          handleClick={()=> handleStartChat(u.id, u.username)}
          key={u.id}
          user={u}
          otherUser
        />
      ))}
    </FlipMove>
  );
}

export default Users;
