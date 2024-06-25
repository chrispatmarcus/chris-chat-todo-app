import { createSlice } from "@reduxjs/toolkit";
import { types } from "util";
import { chatType, userType } from "../utills/Types";
import { defaultUser } from "./userSlice";

type chatStateType = {
  chats: chatType[];
  isChatsTab: boolean;
  currentSelectedChat: userType;
  rightSidebarOpen: boolean;
};

const initialState: chatStateType = {
  chats: [],
  isChatsTab: false,
  currentSelectedChat: defaultUser,
  rightSidebarOpen: true,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setIschatsTab: (state, action: { payload: boolean; type: string }) => {
      state.isChatsTab = action.payload;
    },

    setChats: (state, action) => {
      const chats = action.payload;
      state.chats = chats;
    },
    setCurrentSelectedChat: (state, action) => {
      state.currentSelectedChat = action.payload;
    },
    setRightSidebarOpen: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },
  },
});
export const {
  setIschatsTab,
  setChats,
  setCurrentSelectedChat,
  setRightSidebarOpen,
} = chatsSlice.actions;
export default chatsSlice.reducer;
