import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserByIdController, uploadUserPhotoController, getUserController } from "../controllers/users.js";
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';


const userRouter = Router();
userRouter.use('/', authenticate);


userRouter.patch('/:userId',
    isValidId('userId'),
    validateBody(updateUserSchema),
    ctrlWrapper(updateUserByIdController),
);

userRouter.get('/', ctrlWrapper(getUserController));

userRouter.put(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(uploadUserPhotoController),
);

export default userRouter;
