import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../utills/Types";

export const userStorageName = "__user";

export const defaultUser: userType = {
  id: "",
  username: "",
  email: "",
  creationTime: "",
  img: "",
  isOnline: false,
  lastSeen: "",
  bio: "",
};
type userStateType = {
  users: userType[];
  currenUser: userType | null;
  alertProps: {
    open: boolean;
    recieverId: string;
    recieverName: string;
  };
};

const initialState: userStateType = {
  users: [],
  currenUser: null,
  alertProps: {
    open: false,
    recieverId: "",
    recieverName: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      //store user in localstorage
      localStorage.setItem(userStorageName, JSON.stringify(user));

      // set all logged users
      state.currenUser = user;
    },
    setUsers: (state, action) => {
      // set all users
      state.users = action.payload;
    },
    setAlertProps: (state, action) => {
      const { open, recieverId, recieverName } = action.payload;

      state.alertProps = {
        open,
        recieverId,
        recieverName,
      };
    },
  },
});
export const { setUser, setUsers, setAlertProps } = userSlice.actions;
export default userSlice.reducer;
