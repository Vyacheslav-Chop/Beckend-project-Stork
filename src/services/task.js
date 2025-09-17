import { TaskModel } from "../db/models/task.js";


export const createTask = async (payload) => {
  const task = await TaskModel.create(payload);

  return task;
};
