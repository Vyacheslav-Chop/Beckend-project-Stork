import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateBody } from '../middlewares/validateBody.js';
<<<<<<< HEAD
import { createTaskValidationSchema, getAllTasksValidationSchema } from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskController, getAllTasksController } from '../controllers/tasks.js';
=======
import { createTaskValidationSchema, updateTaskValidationSchema } from '../validation/task.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskController, updateTaskStatusController } from '../controllers/tasks.js';
>>>>>>> origin/main

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.post(
  '/',
  validateBody(createTaskValidationSchema),
  ctrlWrapper(createTaskController),
);

<<<<<<< HEAD
taskRouter.get(
  '/',
  validateQuery(getAllTasksValidationSchema),
  ctrlWrapper(getAllTasksController),
=======
taskRouter.patch(
  '/:id/status',
  validateBody(updateTaskValidationSchema),
  ctrlWrapper(updateTaskStatusController),
>>>>>>> origin/main
);

export default taskRouter;
