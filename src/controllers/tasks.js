import httpError from 'http-errors';
import { createTask, updateTaskStatus, getAllTasks } from '../services/task.js';
import { buildTasksFilter } from '../utils/buildTasksFilter.js';

export const createTaskController = async (req, res, next) => {
  const task = await createTask({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: task,
  });
};

export const getAllTasksController = async (req, res, next) => {
if (!req.user?._id) throw httpError(401, 'Unauthorized');

  const filters = buildTasksFilter(req.validatedQuery);
  filters.owner = req.user._id;

  const tasks = await getAllTasks({
    sortOrder: req.validatedQuery.sortOrder,
    sortBy: req.validatedQuery.sortBy,
    filters,
  });

  res.json({
    status: 200,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
};

export const updateTaskStatusController = async (req, res, next) => {
  const { taskId } = req.params;

  const owner = req.user._id;
  if (!owner) throw httpError(401, 'Unauthorized');

  const task = await updateTaskStatus(taskId, owner);

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: task,
  });
};
