import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const taskRouter = Router();
taskRouter.use('/', authenticate);

export default taskRouter;
