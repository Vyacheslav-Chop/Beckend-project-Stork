import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { User } from '../db/models/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = Router();

userRouter.use('/', authenticate);
userRouter.get('/user', validateBody(User), ctrlWrapper(getUserController));
export default userRouter;
