import { createTask } from '../services/task.js';

export const createTaskController = async (req, res, next) => {
  const task = await createTask({ ...req.body, useId: req.user._id });
  res
    .status(201)
    .json({ status: 200, message: 'Task created successfully', data: task });
};
