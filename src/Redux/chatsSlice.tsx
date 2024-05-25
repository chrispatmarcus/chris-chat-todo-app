import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats:[],
  isChatsTab:false,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setIschatsTab: (state, action: {payload: boolean; type:string }) => {
      state.isChatsTab = action.payload;
    }
  },
});
export const {setIschatsTab} = chatsSlice.actions;
 export default chatsSlice.reducer;
