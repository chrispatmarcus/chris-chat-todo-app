import React from "react";
import TaskSingle from "./TaskSingle";
import FlipMove from "react-flip-move";
import { TaskType } from "../utills/Types";
type taskType = {
  tasks: TaskType[];
  listid: string;
};

function TaskCompo({ tasks, listid }: taskType) {
  return (
    <div className="p-3 pb-5">
      <FlipMove>
        {tasks.map((t) => (
          <TaskSingle key={t.id} task={t} listid={listid} />
        ))}
      </FlipMove>
      {tasks.length === 0 && <p className="text-center">no task added</p>}
    </div>
  );
}

export default TaskCompo;
