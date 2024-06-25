export type setLoadingTypes = React.Dispatch<React.SetStateAction<boolean>>;
//  this authdatatype will be use as a costom funtion to signup and signin
export type authDataType = {
  email: string;
  password: string;
  // since the signin does not need confirmpassword then the object value will be optional
  confirmPassword?: string;
};

export type userType = {
  id: string;
  username: string;
  email: string;
  bio: string;
  isOnline: boolean;
  img: string;
  creationTime?: string;
  lastSeen?: string;
  bio7?: string;
};

export type taskListType = {
  id?: string;
  title: string;
  editMode?: boolean;
  //array  of tasktype
  tasks?: TaskType[];
};

export type TaskType = {
  id?: string;
  title: string;
  description: string;
  editMode?: boolean;
  collapes?: boolean;
};

export type chatType = {
  senderId: string;
  recieverId: string;
  id?: string;
  lastMsg?: string;
  senderToRecieverNewMsgCount?: number;
  recieverToSenderNewMsgCount?: number;
  updatedAt?: string;
};

export type messageTypes = {
  senderId: string;
  content: string;
  createdAt?: string;
  id?: string;
};
