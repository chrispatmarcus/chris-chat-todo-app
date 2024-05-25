import React, { useEffect, useReducer, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_SIGNUP, BE_SignIn, getStorageUser } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { authDataType } from "../utills/Types";
import { setUser } from "../Redux/userSlice";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const usr = getStorageUser();

  // // prevents the user from login in again when inside the dashboard even when you refresh page
  // useEffect(() => {
  //   if (usr?.id) {
  //     dispatch(setUser(usr));
  //     goTo("/dashboard");
  //   }
  // }, []);

  const handleSignup = () => {
    const data = { email, password, confirmPassword };
    auth(data, BE_SIGNUP, setSignUpLoading);
  };
  const handleSignin = () => {
    const data = { email, password };
    auth(data, BE_SignIn, setSignInLoading);
  };

  const auth = (
    data: authDataType,
    func: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    func(data, setLoading, reset, goTo, dispatch);
  };
  //  resets all the variables after login
  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!login && (
          <Input
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {login ? (
          <>
            <Button
              text="Login"
              onClick={handleSignin}
              loading={signInLoading}
            />
            <Button onClick={() => setLogin(false)} text="Register" secondary />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleSignup}
              loading={signUpLoading}
            />
            <Button
              onClick={() => setLogin(true)}
              text="Login"
             loading ={signUpLoading}
              secondary
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Login;
