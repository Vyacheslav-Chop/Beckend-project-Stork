import { createTask as createTaskService } from '../services/task.js';

export const createTask = async (req, res, next) => {
  try {
    const { nameTask, dataTask } = req.body;
    const owner = req.user._id;
    const task = await createTaskService({ nameTask, dataTask, owner });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
