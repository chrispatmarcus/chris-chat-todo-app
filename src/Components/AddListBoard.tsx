import React, { useState } from "react";
import Button from "./Button";
import Icon from "./icons";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

const AddListBoard = () => {
  const [addLoading, setAddloading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setAddloading);
  };
  return (
    <>
      <Button
        text="Add New ListBoard "
        onClick={handleAddTaskList}
        className="hidden md:flex"
        loading={addLoading}
      />
      <Icon
        IconName={MdAdd}
        onClick={handleAddTaskList}
        className="block md:hidden "
        loading={addLoading}
      />
    </>
  );
};

export default AddListBoard;
