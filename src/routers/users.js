import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.use('/', authenticate);

export default userRouter;
