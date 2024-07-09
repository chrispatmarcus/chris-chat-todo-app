import React, { useEffect } from "react";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./Pages/ListPage";
import ProfilePage from "./Pages/ProfilePage";
import Chatpage from "./Pages/chatPage";
import Layout from "./Pages/Layout";
import { useAppDispatch } from "./Redux/hooks";
import { setUser } from "./Redux/userSlice";
import { getCurrentUser } from "./utills/getCurrentUser";
import { getStorageUser } from "./Backend/Queries";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentLogUser = getCurrentUser();
    if (currentLogUser) {
      dispatch(setUser(currentLogUser));
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path="chat" element={<Chatpage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
