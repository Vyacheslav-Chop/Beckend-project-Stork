import { Task } from '../db/models/task.js';

export const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};
