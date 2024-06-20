import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../utills/Types";

export const userStorageName = "superhero_user";

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
  currenUser: userType;
};

const initialState: userStateType = {
  users: [],
  currenUser: defaultUser,
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
  },
});
export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
