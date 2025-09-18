import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../middlewares/validateBody.js';
import { createTaskValidationSchema } from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskController } from '../controllers/tasks.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.post(
  '/',
  validateBody(createTaskValidationSchema),
  ctrlWrapper(createTaskController),
);

export default taskRouter;
