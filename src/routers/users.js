import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/users.js';

const userRouter = Router();

userRouter.use('/', authenticate);

userRouter.get('/users', authenticate, ctrlWrapper(getUserController));

export default userRouter;
