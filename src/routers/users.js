import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserByIdController } from "../controllers/users.js";
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user';
import { isValidId } from '../middlewares/isValidId.js';

const userRouter = Router();
userRouter.use('/', authenticate);

userRouter.patch('/:userId',
    isValidId('userId'),
    validateBody(updateUserSchema),
    ctrlWrapper(updateUserByIdController),
);


export default userRouter;
