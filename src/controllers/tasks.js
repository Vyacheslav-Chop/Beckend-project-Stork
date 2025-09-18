import { createTask, updateTaskStatus} from '../services/task.js';

export const createTaskController = async (req, res, next) => {
  const task = await createTask({ ...req.body, useId: req.user._id });
  res
    .status(201)
    .json({ status: 200, message: 'Task created successfully', data: task });
};

export const updateTaskStatusController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const task = await updateTaskStatus(id, userId);

  if (!task) {
    return res.status(404).json({
      status: 404,
      message: "Task not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Task updated successfully",
    data: task,
  });
};