import { Router } from 'express';
import { updateUserController } from "../controllers/users.js";
import { updateUserSchema } from '../validation/user';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';

const userRouter = Router();

userRouter.use('/', authenticate);
userRouter.patch('/',
    authenticate,
    validateBody(updateUserSchema),
    updateUserController);


export default userRouter;
