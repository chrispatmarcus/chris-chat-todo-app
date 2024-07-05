import { createSlice } from "@reduxjs/toolkit";
import { TaskType, taskListType } from "../utills/Types";

export const defaultTaskList: taskListType = {
  title: "sample Task list",
};
export const defaultTask: TaskType = {
  title: "i will do this at 9am",
  description: "this is what i love most",
};

type taskListSliceType = {
  currentTaskList: taskListType[];
};

const initialState: taskListSliceType = {
  currentTaskList: [],
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTaskList = action.payload;
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
    saveTaskListTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskList = state.currentTaskList.map((tl) => {
        if (tl.id === id) {
          tl.title = title;
          tl.editMode = false;
        }
        return tl;
      });
    },
    // function to switch back to  edit mode after editing
    taskListSwitchEditMode: (state, action) => {
      const { id, value } = action.payload;
      state.currentTaskList = state.currentTaskList.map((tl) => {
        if (tl.id === id) {
          tl.editMode = value !== undefined ? value : true;
        }
        return tl;
      });
    },
    deleteTaskList: (state, action) => {
      const listid = action.payload;
      // filter is going to collect all tasklist that thier id are not same with the current list id
      state.currentTaskList = state.currentTaskList.filter(
        (tl) => tl.id !== listid
      );
    },
    addTask: (state, action) => {
      // get  a tasklistid so we can add a task to it
      const { listid, newTask } = action.payload;
      const updatedList = state.currentTaskList.map((tl) => {
        if (tl.id === listid) {
          //switch current task list edit mode to false if its true
          tl.editMode = false;
          // switch of edit mode of all other tasks and collapse them
          const tasks = tl.tasks?.map((t) => {
            t.editMode = false;
            t.collapes = true;
            return t;
          });
          // push new task in edit mode
          tasks?.push({ ...newTask, editMode: true, collapes: false });
          tl.tasks = tasks;
        }
        return tl;
      });
    },

    collapeTask: (state, action) => {
      // collect the listid and taskid
      const { listid, id } = action.payload;
      // all funstions to find a listid , loop through the list task and
      // find the task with thesame id using taskid then after we
      // switch its collapse state
      const taskList = state.currentTaskList.find((tl) => tl.id === listid);
      const listidx = state.currentTaskList.findIndex((tl) => tl.id === listid);
      // collapse and uncollape task
      taskList?.tasks?.map((t) => {
        if (t.id === id) {
          // switching
          t.collapes = !t.collapes;
        }
      });
      if (taskList) state.currentTaskList[listidx] = taskList;
    },
    collapseAllTask: (state, action) => {
      const { listId, value } = action.payload;
      const taskList = state.currentTaskList.find((tl) => tl.id === listId);
      const listidx = state.currentTaskList.findIndex((tl) => tl.id === listId);
      // collapse all and turn off edit mode for all the task
      taskList?.tasks?.map((t) => {
        t.collapes = value! == undefined ? value : true;
        t.editMode = false;
        return t;
      });
      if (taskList) state.currentTaskList[listidx] = taskList;
    },

    taskSwitchEditMode: (state, action) => {
      const { listId, id, value } = action.payload;
      const updateTaskList = state.currentTaskList.map((tl) => {
        if (tl.id === listId) {
          const updatedT = tl.tasks?.map((t) => {
            if (tl.id === id) {
              t.editMode = value !== undefined ? value : true;
            }
            return t;
          });
          tl.tasks = updatedT;
        }
        return tl;
      });
      state.currentTaskList = updateTaskList;
    },
    saveTask: (state, action) => {
      const { listId, id, title, description } = action.payload;
      console.log("see it" + title);
      const updatedTaskList = state.currentTaskList.map((tl) => {
        if (tl.id === listId) {
          const updatedTask = tl.tasks?.map((t) => {
            if (t.id === id) {
              t = { ...t, title, description, editMode: false };
            }
            return t;
          });
          tl.tasks = updatedTask;
        }
        return tl;
      });
      state.currentTaskList = updatedTaskList;
    },
    setTaskListTasks: (state, action) => {
      const { listid, tasks } = action.payload;
      console.log(listid);
      const taskList = state.currentTaskList.map((tl) => {
        if (tl.id === listid) {
          tl.tasks = tasks;
        }
        return tl;
      });
      state.currentTaskList = taskList;
    },
    deleteTask: (state, action) => {
      const { listId, id } = action.payload;
      const updatedTaskList = state.currentTaskList.map((tl) => {
        if (tl.id === listId) {
          tl.tasks = tl.tasks?.filter((t) => t.id !== id);
        }
        return tl;
      });
      state.currentTaskList = updatedTaskList;
    },
  },
});
export const {
  setTaskList,
  addTaskList,
  saveTaskListTitle,
  taskListSwitchEditMode,
  deleteTaskList,
  addTask,
  collapeTask,
  taskSwitchEditMode,
  saveTask,
  setTaskListTasks,
  deleteTask,
  collapseAllTask,
} = taskListSlice.actions;
export default taskListSlice.reducer;
