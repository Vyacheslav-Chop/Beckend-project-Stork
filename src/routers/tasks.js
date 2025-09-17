import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createTaskValidationSchema, updateTaskValidationSchema } from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskController, updateTaskStatusController } from '../controllers/tasks.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.post(
  '/',
  validateBody(createTaskValidationSchema),
  ctrlWrapper(createTaskController),
);

taskRouter.patch(
  '/:id/status',
  validateBody(updateTaskValidationSchema),
  ctrlWrapper(updateTaskStatusController),
);

export default taskRouter;
