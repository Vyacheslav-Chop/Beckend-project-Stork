import httpError from 'http-errors';
import { createTask, updateTaskStatus, getAllTasks } from '../services/task.js';

export const createTaskController = async (req, res, next) => {
  const task = await createTask({ ...req.body, useId: req.user._id });
  res
    .status(201)
    .json({ status: 200, message: 'Task created successfully', data: task });
};

export const getAllTasksController = async (req, res, next) => {
  const owner = req.user?._id;
  if (!owner) throw httpError(401, 'Unauthorized');

  const { isDone, order } = req.validatedQuery ?? {};

  const tasks = await getAllTasks({ userId, isDone, order });

  res.json({
    status: 200,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
};

export const updateTaskStatusController = async (req, res, next) => {
  const { taskId } = req.params;
  const owner = req.user._id;
  const task = await updateTaskStatus(taskId, owner);

  if (!task) {
    return res.status(404).json({
      status: 404,
      message: 'Task not found',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: task,
  });
};
