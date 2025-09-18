import { TaskModel } from "../db/models/task.js";


export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};

export const getAllTasks = async ({ userId, isDone, order = 'asc' }) => {
  const outcome = { userId, ...(isDone !== undefined ? { isDone } : {}) };
  const orderDirection = order === 'desc' ? -1 : 1;

  const tasks = await TaskModel
    .find(outcome)
    .sort({ date: orderDirection });

  return tasks;
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