import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskValidationSchema, getAllTasksValidationSchema } from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskController, getAllTasksController } from '../controllers/tasks.js';

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

export default taskRouter;
