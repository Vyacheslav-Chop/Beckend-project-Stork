import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import {
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default authRouter;
