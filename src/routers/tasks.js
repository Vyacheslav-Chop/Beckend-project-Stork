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
  updateTaskController,
  updateTaskStatusController,
} from '../controllers/tasks.js';
import { isValidId } from '../middlewares/isValidId.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.use('/:taskId', isValidId('taskId'));

taskRouter.post(
  '/',
  validateBody(createTaskValidationSchema),
  ctrlWrapper(createTaskController),
);

taskRouter.patch(
  '/:taskId',
  validateBody(updateTaskValidationSchema),
  ctrlWrapper(updateTaskController),
);

taskRouter.get(
  '/',
  validateQuery(getAllTasksValidationSchema),
  ctrlWrapper(getAllTasksController),
);

taskRouter.patch(
  '/:taskId/status',
  ctrlWrapper(updateTaskStatusController),
);

export default taskRouter;
