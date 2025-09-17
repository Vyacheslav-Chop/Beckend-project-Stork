import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/users.js';
import { upload } from '../middlewares/multer.js';
import { uploadUserPhotoController } from '../controllers/users.js';

const userRouter = Router();

userRouter.use('/', authenticate);

userRouter.get('/', ctrlWrapper(getUserController));

userRouter.put(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(uploadUserPhotoController),
);

export default userRouter;
