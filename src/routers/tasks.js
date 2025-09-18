import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  createTaskValidationSchema,
  getAllTasksValidationSchema,
  updateTaskValidationSchema,
} from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createTaskController,
  getAllTasksController,
  updateTaskStatusController,
} from '../controllers/tasks.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.post(
  '/',
  validateBody(createTaskValidationSchema),
  ctrlWrapper(createTaskController),
);

taskRouter.get(
  '/',
  validateQuery(getAllTasksValidationSchema),
  ctrlWrapper(getAllTasksController),
);

taskRouter.patch(
  '/:taskId/status',
  validateBody(updateTaskValidationSchema),
  ctrlWrapper(updateTaskStatusController),
);

export default taskRouter;
