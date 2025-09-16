import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createTask } from '../controllers/tasks.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

taskRouter.post('/', authenticate, createTask);

export default taskRouter;
