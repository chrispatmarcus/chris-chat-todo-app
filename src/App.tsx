import React from "react";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./Pages/ListPage";
import ProfilePage from "./Pages/ProfilePage";
import Chatpage from "./Pages/chatPage";
import Layout from "./Pages/Layout";

function App() {
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
