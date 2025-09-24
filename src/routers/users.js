import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  updateUserByIdController,
  uploadUserPhotoController,
  getUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user.js';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();
userRouter.use('/', authenticate);

userRouter.patch(
  '/',
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserByIdController),
);

userRouter.get('/', ctrlWrapper(getUserController));

userRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(uploadUserPhotoController),
);

export default userRouter;
