import React, { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setAlertProps } from "../Redux/userSlice";
import { BE_startChat } from "../Backend/Queries";

const Alert = () => {
  // collects the state properties of the alertprops object
  const {
    open,
    recieverId: rId,
    recieverName: rName,
  } = useSelector((state: RootState) => state.user.alertProps);
  const dispatch = useDispatch<AppDispatch>();
  const [startChatLoading, setStartChatLoading] = useState(false);
  const handleStartChatting = () => {
    if (rId && rName)
       BE_startChat(dispatch, rId, rName, setStartChatLoading);
  };
  return (
    <div
      className={`fixed top-0 z-50 h-full w-full ${open ? "block" : "hidden"}`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="bg-white border-8 min-w-[90%] md:min-w-[500px] 
      rounnded-[30px] z-30 p-10 flex flex-col"
        >
          <div className="flex-1 mb-5">
            <p>Start chatting with {rName}?</p>
          </div>
          <div className="flex justify-end gap-3">
            {/* set the alertProps:open to be false then reset the other properties */}
            <Button
              onClick={() =>
                dispatch(
                  setAlertProps({
                    open: false,
                    recieverId: "",
                    recieverName: "",
                  })
                )
              }
              text="cancel"
              secondary
            />
            <Button
              onClick={handleStartChatting}
              loading={startChatLoading}
              text="sure"
              secondary
            />
          </div>
        </div>
        <div className="bg-black backdrop-blur-[2px] bg-opacity-30 h-full w-full absolute z-20"></div>
      </div>
    </div>
  );
};

export default Alert;
