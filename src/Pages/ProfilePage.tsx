import react, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { generate } from "random-words";
import AvatarGenerator from "../utills/avatarGenerator";
import { toastErr, toastWarn } from "../utills/toast";
import {  BE_saveProfile } from "../Backend/Queries";
function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [avatar, setAvatar] = useState("");

  const [saveProfileLoading, setSaveProfileLoading] = useState("false");
  const [deleteAccLoading, setdeleteAccLoading] = useState("false");

  const currentUser = useSelector((state: RootState) => state.user.currenUser);
  const dispatch = useDispatch<AppDispatch>();

  // set the defualt email input and username to the user current information
  useEffect(() => {
    setEmail(currentUser.email);
    setUsername(currentUser.username);
  }, [currentUser]);

  const handleAvatarGeneration = () => {
    setAvatar(AvatarGenerator());
  };

  const handleSaveProfile = async () => {
    // make sure email and username arent empty
    if (!email || !username) toastErr("email or username can't be empty");

    // if there a password, make sure it's equal to confirm password
    let temp_password = password;
    if (temp_password && temp_password != confirmPass) {
      toastErr("passwords must match!");
      temp_password = "";
    }

    // only update email if it was changed
    let temp_email = email;
    if (temp_email === currentUser.email) temp_email = "";

    //only update username if it was changed
    let temp_username = username;
    if (temp_username === currentUser.username) temp_username = "";

    // only update avatar if it was changed
    let temp_avatar = avatar;
    if (temp_avatar === currentUser.img) temp_avatar = "";

    if (temp_email || temp_username || temp_password || temp_avatar) {
      // save profile
       await BE_saveProfile(
         dispatch,
         {
           email: temp_username,
           username: temp_username,
           password: temp_password,
           img: temp_avatar,
         },
        //  setSaveProfileLoading
       );
    } else toastWarn("change details before saving!");
  };

  return (
    <div
      className=" bg-[#f3f0f1] flex flex-col gap-5 shadow-md max-w-2xl rounded-xl py-5 px-6 md:p-10
  md:m-auto m-5 md:mt-10"
    >
      <div className="relative self-center" onClick={handleAvatarGeneration}>
        <img
          src={avatar || currentUser.img}
          alt={currentUser.username}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full p-{2px} ring-2 ring-gray-300
      cursor-pointer hover:shadow-lg"
        />
        <span
          className="absolute top-7 md:top-7 left-28 md:left-40 w-5 h-5 border-2 border-gray-800
      rounded-full bg-green-400"
        ></span>
      </div>
      <p className="text-gray-400 text-sm text-center">
        note: click on image to temporary change it , when you like it , then
        save profile. you can leave password and username as they are if you
        dont want to chnage them
      </p>
      <div className="flex flex-col gap-2">
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="confirmpassword"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <Button
          text="update profile"
          onClick={handleSaveProfile}
          // loading={saveProfileLoading}
        />
        <Button text="delete account" />
      </div>
    </div>
  );
}

export default ProfilePage;
