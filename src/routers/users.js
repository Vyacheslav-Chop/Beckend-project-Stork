import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { uploadUserPhotoController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const userRouter = Router();

userRouter.use('/', authenticate);

userRouter.put(
  '/api/users/avatar',
  upload.single('avatar'),
  ctrlWrapper(uploadUserPhotoController),
);

export default userRouter;
