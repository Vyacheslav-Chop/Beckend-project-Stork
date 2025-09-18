import httpError from 'http-errors';
import { createTask, getAllTasks } from '../services/task.js';

export const createTaskController = async (req, res, next) => {
  const task = await createTask({ ...req.body, useId: req.user._id });
  res
    .status(201)
    .json({ status: 200, message: 'Task created successfully', data: task });
};

export const getAllTasksController = async (req, res, next) => {
  const userId = req.user?._id;
  if (!userId) throw httpError(401, 'Unauthorized');

  const { isDone, order } = req.validatedQuery ?? {};
  const { tasks } = await getAllTasks({ userId, isDone, order });

  res.json({
    status: 200,
    message: 'Tasks fetched successfully',
    data: { tasks }
  });
};