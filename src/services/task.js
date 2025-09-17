import { Task } from '../db/models/task.js';

export const createTask = async (taskData) => {
  const { name, date, isDone = false, owner } = taskData;
  const task = await Task.create({ name, date, isDone, owner });
  return task;
};
