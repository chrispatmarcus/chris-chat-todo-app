import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
type Props = {};

function Layout({}: Props) {
  return (
    <div className="h-[100hv] flex flex-col">
      <Header />
      <div className="bg-pattern  h-[500px] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
