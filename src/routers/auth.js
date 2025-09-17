import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { registerUserValidationSchema } from '../validation/auth.js';
import {
  refreshUserSessionController,
  registerUserController,
  logoutUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default authRouter;
