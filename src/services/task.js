import createHttpError from 'http-errors';
import { TaskModel } from '../db/models/task.js';

export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};

export const getAllTasks = async ({ owner, isDone, order = 'asc', date }) => {
  const outcome = { owner, ...(isDone !== undefined ? { isDone } : {}) };
  const orderDirection = order === 'desc' ? -1 : 1;

  const tasks = await TaskModel.find(outcome).sort({ date: orderDirection });

  return tasks;
};

export const updateTaskStatus = async (taskId, owner) => {
  const task = await TaskModel.findOne({ _id: taskId, owner });

  if (!task)
    throw createHttpError(
      404,
      'Not found task!',
    );

  task.isDone = !task.isDone;

  await task.save();
  return task;
};
