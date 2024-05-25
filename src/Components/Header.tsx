import React, { useEffect } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import AddListBoard from "./AddListBoard";
import Icon from "./icons";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { BE_signOut, getStorageUser } from "../Backend/Queries";
import { setUser } from "../Redux/userSlice";
const logo = require("../Assets/amazon-mobile-logo.png");
type Props = {};

function Header() {
  const goTo = useNavigate();
  // usedispatch to dispatch state functions
  const dispatch = useDispatch();
  // useselector to select state variables
  const currentUser = useSelector((state: RootState) => state.user.currenUser);
  const usr = getStorageUser();

  // useeffect that help prevents user from going to dashboard if it does not exist or has not log in
  // useEffect(() => {
  //   if (usr?.id) {
  //     dispatch(setUser(usr));
  //   } else {
  //     goTo("/auth");
  //   }
  // }, [dispatch,goto]);

  // // useeffect that allows user to remian in current page  even after refreshing
  // useEffect(() => {
  //   const page = getCurrentPage();
  //   if (page) goTo("/dashboard/" + page);
  // }, [goTo]);

  const HandleGoPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };
  const HandleSignout = async () => {
    await BE_signOut(dispatch, goTo);
  };
  // set the current url or page into localstorage
  const setCurrentPage = (page: string) => {
    localStorage.setItem("superhero-page", page);
  };
  // get the current url from localstorage
  const getCurrentPage = () => {
    return localStorage.getItem("superhero-page");
  };
  return (
    <div
      className="flex  flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md
   bg-gradient-to-r  from-myBlue to-myPink px-5 py-5 md:py-2 text-white"
    >
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={logo}
        alt="logo"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            reduceOpacityOnHover={false}
            onClick={() => HandleGoPage("list")}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon IconName={FiList} onClick={() => HandleGoPage("list")} />
            <Icon
              IconName={BsFillChatFill}
              ping={true}
              onClick={() => HandleGoPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              IconName={BsFillChatFill}
              ping={true}
              onClick={() => HandleGoPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        )}

        <div className="group">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <p
                onClick={() => HandleGoPage("profile")}
                className=" hover:bg-gray-200 py-2 px-4 block cursor-pointer"
              >
                profile
              </p>
              <p
                onClick={HandleSignout}
                className="hover:bg-gray-200 py-2 px-4 block cursor-pointer"
              >
                Logout
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
