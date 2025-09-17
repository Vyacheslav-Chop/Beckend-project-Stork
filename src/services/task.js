import { TaskModel } from "../db/models/task.js";


export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};


export const updateTaskStatus = async (taskId, userId, isDone) => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskId, userId },
    { isDone },
    { new: True }
    
  );

  return task;
};