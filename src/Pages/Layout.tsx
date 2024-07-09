import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Alert from "../Components/Alert";
import { useAppSelector } from "../Redux/hooks";
type Props = {};

function Layout({}: Props) {
  const navigate = useNavigate();
  const { currenUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!currenUser) {
      navigate("/auth");
    }
  }, [currenUser]);
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-pattern  h-full overflow-y-scroll">
        <Outlet />
      </div>
      <Alert />
    </div>
  );
}

export default Layout;
