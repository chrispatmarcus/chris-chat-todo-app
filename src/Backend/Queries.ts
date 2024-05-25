import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr, toastSucc } from "../utills/toast";
import catchErr from "../utills/catchErr";
import {
  TaskType,
  authDataType,
  setLoadingTypes,
  taskListType,
  userType,
} from "../utills/Types";
import { NavigateFunction } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { debug } from "util";
import {
  defaultUser,
  setUser,
  setUsers,
  userStorageName,
} from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import convertTime from "../utills/convertTime";
import AvatarGenerator from "../utills/avatarGenerator";
import {
  addTask,
  addTaskList,
  defaultTask,
  defaultTaskList,
  deleteTask,
  saveTask,
  saveTaskListTitle,
  setTaskList,
  setTaskListTasks,
} from "../Redux/taskListSlice";
import TaskCompo from "../Components/TaskCompo";
//collection  name
const userscoll = "users";
const tasksColl = "tasks";
const taskListColl = "tasklist";
const chatsColl = "chats";
const messagesColl = "messages";

// querry funstion to register or sign up a user
export const BE_SIGNUP = (
  data: authDataType,
  setloading: setLoadingTypes,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  // destructuring variables from the object data
  const { email, password, confirmPassword } = data;
  setloading(true);
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          // function to generate user avartar with user name
          const imgLink = AvatarGenerator();
          // this function collects user email, user name by splitting the name section in the email
          // the \\ indicates the 'OR' word which will pass am empty string if user email does not exist
          // collects user information from the database
          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            imgLink
          );
          // set user info in store and in localstorage
          dispatch(setUser(userInfo));

          setloading(false);
          // reset if we succeded in creating the user
          reset();

          // go to dashbaord
          goTo("/dashboard");
        })
        .catch((err) => catchErr(err));
    } else toastErr("password must match");
  } else {
    toastErr("Fields should not be left empty");
  }
  setloading(false);
};
// query function to signin user
export const BE_SignIn = (
  data: authDataType,
  setloading: setLoadingTypes,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  setloading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      //  update the user isOnline property
      await updateUserInfo({ id: user.uid, isOnline: true });
      // get user info
      const userInfo = await getUserInfo(user.uid);

      // set user instore and local storage
      dispatch(setUser(userInfo));

      setloading(false);
      reset();
      goTo("/dashboard");
    })
    .catch((err) => {
      catchErr(err);
      setloading(false);
    });
};
export const BE_signOut = async (
  dispatch: AppDispatch,
  goTo: NavigateFunction
) => {
  //logout in firebase
  signOut(auth);
  //set user offline
  await updateUserInfo({ isOffline: true });
  //set currentselected user to empty user
  dispatch(setUser(defaultUser));
  //remove from local storage
  localStorage.removeItem(userStorageName);
  //route to auth page
  goTo("/auth");
};
// save user profile
export const BE_saveProfile = async (
  dispatch: AppDispatch,
  data: { email: string; username: string; password: string; img: string }
  // setLoading: setLoadingTypes
) => {
  // setLoading(true);
  const { email, username, password, img } = data;
  const id = getStorageUser().id;
  if (id && auth.currentUser) {
    // update email  if present
    if (email) {
      updateEmail(auth.currentUser, email).then(() => {
        toastSucc("email updated successfully!");
      });
    }
    // update password if present
    if (password) {
      updatePassword(auth.currentUser, password).then(() => {
        toastSucc("password updated successfully!");
      });
    }
    // update user collection pnly if username or img is present
    if (username || img) {
      await updateUserInfo({ username, img });
      toastSucc("updated profile successfully!");
    }

    // get user latest info
    const userInfo = await getUserInfo(id);
    // update user in state or stpore
    dispatch(setUser(userInfo));
    // setLoading(false);
  } else toastErr("BE_saveProfile: id not found");
};

//get all users for userchat
export const BE_getAllUsers = async (
  dispatch: AppDispatch,
  setLoading: setLoadingTypes
) => {
  setLoading(true);
  // get all users except the current signin one, those online should be ontop
  const q = query(collection(db, userscoll), orderBy("isOnline", "desc"));
  onSnapshot(q, (usersSnapshot) => {
    let users: userType[] = [];
    usersSnapshot.forEach((user) => {
      const { img, isOnline, username, email, bio, creationTime, lastSeen } =
        user.data();
      users.push({
        id: user.id,
        img,
        isOnline,
        username,
        email,
        bio,
        creationTime: convertTime(creationTime.toDate()),
        lastSeen: convertTime(lastSeen.toDate()),
      });
    });
    // take out the current user 
    const id = getStorageUser().id;
    if (id) {
      // it selects all the sign in users except u(the current user)
      dispatch(setUsers(users.filter((u) => u.id != id)));
    }
    setLoading(false);
  });
};

// add user to collection
const addUserToCollection = async (
  id: string,
  email: string,
  username: string,
  img: string
) => {
  //create user with userid
  await setDoc(doc(db, userscoll, id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `hi my name is ${username}, thansk for allowing me use your app, i am a software engineering student`,
  });
  // after creating user it has to get the user information
  return getUserInfo(id);
};
// function to get user information
const getUserInfo = async (id: string): Promise<userType> => {
  const userRef = doc(db, userscoll, id);
  const user = await getDoc(userRef);

  if (user.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      user.data();
    return {
      id: user.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? convertTime(creationTime.toDate())
        : "no data yet: userinfo",
      lastSeen: lastSeen
        ? convertTime(creationTime.toDate())
        : "no data yet: userinfo",
    };
  } else {
    toastErr("getUserInfo: user not found");
    return defaultUser;
  }
};

// update user information
const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: String;
  username?: String;
  img?: String;
  isOnline?: Boolean;
  isOffline?: Boolean;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }
  if (id) {
    await updateDoc(doc(db, userscoll, id as string), {
      ...(username && { username }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      ...(img && { img }),
      lastSeen: serverTimestamp(),
    });
  }
};
// get user from localstorage
export const getStorageUser = () => {
  const usr = localStorage.getItem(userStorageName);
  if (usr) return JSON.parse(usr);
  else return null;
};

// .....................querries for tasks....................................

// add a single tasklist
export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setloading: setLoadingTypes
) => {
  setloading(true);
  const { title } = defaultTaskList;
  const list = await addDoc(collection(db, taskListColl), {
    title,
    userId: getStorageUser().id,
  });
  const newDocSnap = await getDoc(doc(db, list.path));

  if (newDocSnap.exists()) {
    const newlyAddedDoc: taskListType = {
      id: newDocSnap.id,
      title: newDocSnap.data().title,
    };
    dispatch(addTaskList(newlyAddedDoc));
    setloading(false);
  } else {
    toastErr("BE_addTaskList:No such doc");
    setloading(false);
  }
};

export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setloading: setLoadingTypes
) => {
  setloading(true);
  // get user task list
  const tasklist = await getAllTaskList();

  dispatch(setTaskList(tasklist)); //Dispatch a redux action
  setloading(false);
};
export const BE_saveTaskList = async (
  dispatch: AppDispatch,
  setloading: setLoadingTypes,
  listId: string,
  title: string
) => {
  setloading(true);
  await updateDoc(doc(db, taskListColl, listId), { title });
  const updatedTaskList = await getDoc(doc(db, taskListColl, listId));
  setloading(false);

  // dispatch to save task list
  dispatch(
    saveTaskListTitle({ id: updatedTaskList.id, ...updatedTaskList.data() })
  );
};

export const BE_deleteTaskList = async (
  listId: string,
  tasks: TaskType[],
  dispatch: AppDispatch,
  setloading: setLoadingTypes
) => {
  setloading(true);
  // looping through eact task and deleting each
  if (TaskCompo.length > 0) {
    for (let i = 0; i < TaskCompo.length; i++) {
      const { id } = tasks[i];
      //delete eact of the task subcollection
      if (id) BE_deleteTask(listId, id, dispatch);
    }
  }
  // delete taskList board or you say task list document
  const listRef = doc(db, taskListColl, listId);
  await deleteDoc(listRef);

  const deletedTaskList = await getDoc(listRef);
  if (!deletedTaskList.exists()) {
    setloading(false);
    //updating the state
    dispatch(deleteTask(listId));
  }
};
// get all users tasklist
const getAllTaskList = async () => {
  const q = query(
    collection(db, taskListColl),
    where("userId", "==", getStorageUser().id)
  );
  const taskListSnapshot = await getDocs(q);
  const taskList: taskListType[] = [];
  taskListSnapshot.forEach((doc) => {
    const { title } = doc.data();
    taskList.push({
      id: doc.id,
      title,
      editMode: false,
      tasks: [],
    });
  });
  return taskList;
};

//................................FOR TASK.............................

//delete a task
export const BE_deleteTask = async (
  listid: string,
  id: string,
  dispatch: AppDispatch,
  setLoading?: setLoadingTypes
) => {
  if (setLoading) setLoading(true);

  //delete doc
  const taskRef = doc(db, taskListColl, listid, tasksColl, id);
  await deleteDoc(taskRef);
  const deletedTask = await getDoc(taskRef);
  if (!deletedTask.exists()) {
    if (setLoading) setLoading(false);
    //dispatch (deletedTask)
  }
};
// add task or taskcompo in a singleTaskList
export const BE_addTask = async (
  dispatch: AppDispatch,
  listid: string,
  setLoading: setLoadingTypes
) => {
  setLoading(true);
  // adds the defaulttask
  const task = await addDoc(collection(db, taskListColl, listid, tasksColl), {
    ...defaultTask,
  });
  // get the defaulttask
  const newTaskSnapShot = await getDoc(doc(db, task.path));
  if (newTaskSnapShot.exists()) {
    //destructure the doc coming from the database
    const { title, description } = newTaskSnapShot.data();
    //creating a new task with some new propertiesnwhich i want to add to the store
    const newTask: TaskType = {
      id: newTaskSnapShot.id,
      title,
      description,
    };
    // add in redux store
    dispatch(addTask({ listid, newTask }));
    setLoading(false);
  } else {
    toastErr("BE_addtask: no such document found");
    setLoading(true);
  }
};

//  function to save the edited task
export const BE_saveTask = async (
  dispatch: AppDispatch,
  listid: string,
  data: TaskType,
  setLoading: setLoadingTypes
) => {
  setLoading(true);
  const { id } = data;
  if (id) {
    const taskRef = doc(db, taskListColl, listid, tasksColl, id);
    // update the edited task in databse
    await updateDoc(taskRef, data);
    const updatedtask = await getDoc(taskRef);
    if (updatedtask.exists()) {
      setLoading(false);
      // dispatch
      dispatch(saveTask({ listid, ...updatedtask.data() }));
    } else toastErr("BE_saveTask:updated task not found");
  } else toastErr("BE_saveTask: id not found");
};
// get tasks for task list
export const getTasksForTaskList = async (
  dispatch: AppDispatch,
  listid: string,
  data: TaskType,
  setLoading: setLoadingTypes
) => {
  setLoading(true);

  // get tasks in a single task list
  const taskRef = collection(db, taskListColl, listid, tasksColl);
  const tasksSnapshot = await getDocs(taskRef);
  const tasks: TaskType[] = [];
  // if the tasks snap shot is not empty then do foreach
  if (!tasksSnapshot.empty) {
    tasksSnapshot.forEach((task) => {
      const { title, description } = task.data();
      tasks.push({
        id: task.id,
        title,
        description,
        editMode: false,
        collapes: true,
      });
    });
  }
  dispatch(setTaskListTasks({ listid, tasks }));
  setLoading(false);
};

//.......................................for
