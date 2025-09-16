import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import {
  loginUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post('/refresh', refreshUserSessionController);

authRouter.post('/login', validateBody(loginUserSchema), loginUserController);
export default authRouter;
