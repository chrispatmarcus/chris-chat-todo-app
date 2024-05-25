import React, { forwardRef, useState } from "react";
import Icon from "./icons";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { TaskType } from "../utills/Types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { collapeTask, taskListSwitchEditMode } from "../Redux/taskListSlice";
import { BE_deleteTask, BE_saveTask } from "../Backend/Queries";
type taskType = {
  task: TaskType;
  listid: string;
};

const TaskSingle = forwardRef(
  ({ task, listid }: taskType, ref: React.LegacyRef<HTMLDivElement>) => {
    const { id, title, description, editMode, collapes } = task;
    const [homeTitle, setHometitle] = useState(title);
    const [homeDescription, setHomeDescription] = useState(description);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = () => {
      const taskData: TaskType = {
        id,
        title: homeTitle,
        description: homeDescription,
      };
      //save function
      BE_saveTask(dispatch, listid, taskData, setSaveLoading);
    };
    const handleDelete = () => {
      if (id) BE_deleteTask(listid, id, dispatch, setDeleteLoading);
    };

    return (
      <div
        ref={ref}
        className="p-2 bg-white mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <div>
          {editMode ? (
            <input
              value={homeTitle}
              onChange={(e) => setHometitle(e.target.value)}
              className="border-2 p-2 border-myBlue"
              placeholder="Task title "
            />
          ) : (
            <p
              onClick={() => dispatch(collapeTask({ listid, id }))}
              className="cursor-pointer "
            >
              {title}
            </p>
          )}
        </div>
        {!collapes && (
          <div>
            <div>
              {editMode ? (
                <textarea
                  onChange={(e) => setHomeDescription(e.target.value)}
                  value={homeDescription}
                  placeholder="todo-description"
                  className="w-full px-3 border-2 border-myBlue rounded-md mt-2"
                />
              ) : (
                <p className="p-2 text-justify">{description}</p>
              )}

              <div className="flex justify-end">
                <Icon
                  onClick={() =>
                    editMode
                      ? handleSave()
                      : dispatch(taskListSwitchEditMode({ listid, id }))
                  }
                  IconName={editMode ? MdSave : MdEdit}
                  loading={editMode && saveLoading}
                />
                <Icon onClick={handleDelete} IconName={MdDelete} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default TaskSingle;
