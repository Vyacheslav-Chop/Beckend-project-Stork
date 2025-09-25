import createHttpError from 'http-errors';
import { TaskModel } from '../db/models/task.js';

export const createTask = async (payload) => {
  if (payload.date) {
    const [year, month, day] = payload.date.split('.').map(Number);
    payload.date = new Date(Date.UTC(year, month - 1, day));
  }

  const task = await TaskModel.create(payload);

  return task;
};

export const getAllTasks = async ({
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
}) => {
  const order = sortOrder === 'desc' ? -1 : 1;

  const tasks = await TaskModel.find(filters).sort({ [sortBy]: order });

  return tasks;
};

export const updateTask = async (taskId, userId, payload) => {
  const task = await TaskModel.findOneAndUpdate(
    { _id: taskId, owner: userId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) throw createHttpError(404, 'Not found task!');

  return task;
};

export const updateTaskStatus = async (taskId, owner) => {
  const task = await TaskModel.findOne({ _id: taskId, owner });

  if (!task) throw createHttpError(404, 'Not found task!');

  task.isDone = !task.isDone;

  await task.save();
  return task;
};
