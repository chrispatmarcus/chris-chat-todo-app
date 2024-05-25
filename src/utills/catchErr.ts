import { toastErr, toastInfo } from "./toast";

const catchErr = (err: { code?: string }) => {
  const { code } = err;
  if (code === "auth/invalid-email") toastErr("wrong or invalid email");
  else if (code === "auth/weak-password")
    toastErr("password should be atleast 8 characters");
  else if (code === "auth/user-not-found") toastErr("user not found");
  else if (code === "auth/eamil-already-in-use")
    toastErr("eamil already exist");
  else if (code === "auth/wrong password") toastErr("wrong password");
  else if (code === "auth/requires-recent-login")
    toastInfo("logout and login before updating your profile");
  else toastErr("An error occured");
  console.log(err);
};

export default catchErr;
