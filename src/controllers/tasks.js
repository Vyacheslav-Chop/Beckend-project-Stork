import { createTaskController as createTaskService } from '../services/task.js';

export const createTaskController = async (req, res, next) => {
  try {
    const { name, date, isDone } = req.body;
    const owner = req.user._id;
    const task = await createTaskService({ name, date, isDone, owner });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
