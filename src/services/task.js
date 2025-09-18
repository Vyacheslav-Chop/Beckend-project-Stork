import { TaskModel } from "../db/models/task.js";


export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};


export const updateTaskStatus = async (taskId, userId, isDone) => {
  const task = await TaskModel.findOne({ _id: taskId, userId });

  if (!task) {
    throw new Error('Task not found!');
  }

  task.isDone = !task.isDone;
  
  await task.save();
  return task;
};