import React, { forwardRef, useEffect, useState } from "react";
import Icon from "./icons";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import TaskCompo from "./TaskCompo";
import { taskListType } from "../utills/Types";
import Input from "./Input";
import {
  collapeTask,
  collapseAllTask,
  taskListSwitchEditMode,
} from "../Redux/taskListSlice";
import {
  BE_deleteTaskList,
  BE_saveTaskList,
  BE_addTask,
  getTasksForTaskList,
} from "../Backend/Queries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
type singleTypesListProps = {
  singleTaskList: taskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: singleTypesListProps,
    ref: React.LegacyRef<HTMLDivElement>
  ) => {
    const { id, editMode, tasks = [], title } = singleTaskList;
    const [homeTitle, setHometitle] = useState(title);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [addTaskLoading, setAddTaskLoading] = useState(false);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [allCollapse, setAllCollapse] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //   //get task here
    //   if (id ) getTasksForTaskList(dispatch, id, setTasksLoading);
    // }, [dispatch, id]);

    useEffect(() => {
      const checkAllCollapse = () => {
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          if (!task.collapes) return setAllCollapse(false);
        }
        return setAllCollapse(true);
      };
      checkAllCollapse();
    }, []);

    const HandleSaveTaskListTile = () => {
      if (id) {
        BE_saveTaskList(dispatch, setSaveLoading, id, homeTitle);
      }
    };
    const checkEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        HandleSaveTaskListTile();
      }
    };
    const handleDelete = () => {
      if (id && tasks) BE_deleteTaskList (id, tasks, dispatch, setDeleteLoading);
    };
    const handleAddTask = () => {
      if (id) BE_addTask(dispatch, id, setAddTaskLoading);
    };
    const handleCollapseClick = () => {
      if (allCollapse) {
        // if they are all collapse then uncollapse them
        return dispatch(collapseAllTask({ listid: id, value: false }));
      }
      return dispatch(collapseAllTask({ listid: id }));
    };

    return (
      <div ref={ref} className="relative ">
        <div className=" bg-[#d1d3d3]  w-full md:w-[400px] drop-shadow-sm rounded-md overflow-hidden min-h-[150px] ">
          <div
            className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr
        from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center"
          >
            {editMode ? (
              <input
                value={homeTitle}
                onKeyDown={(e) => checkEnterKey(e)}
                onChange={(e) => setHometitle(e.target.value)}
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px]
              border-white rounded-md"
                placeholder="Enter task list tile"
              />
            ) : (
              <p>{title}</p>
            )}

            <div>
              <Icon
                IconName={editMode ? MdSave : MdEdit}
                onClick={() =>
                  editMode
                    ? HandleSaveTaskListTile()
                    : dispatch(taskListSwitchEditMode({ id }))
                }
                reduceOpacityOnHover
                loading={editMode && saveLoading}
              />
              <Icon
                IconName={MdDelete}
                onClick={handleDelete}
                reduceOpacityOnHover
                loading={deleteLoading}
              />
              <Icon
                onClick={handleCollapseClick}
                IconName={MdKeyboardArrowDown}
                className={`${allCollapse ? "rotate-180" : "rotate-0"} `}
                reduceOpacityOnHover
              />
            </div>
          </div>
          {id && <TaskCompo tasks={tasks || []} listid={id} />}
        </div>
        <Icon
          onClick={handleAddTask}
          IconName={MdAdd}
          className="absolute -mt-6 -ml-4 p-2 drop-shadow-lg hover:bg-myPink"
          reduceOpacityOnHover={false}
          loading={addTaskLoading}
        />
      </div>
    );
  }
);

export default SingleTaskList;
