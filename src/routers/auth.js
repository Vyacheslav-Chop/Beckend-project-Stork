import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { registerUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  'auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

export default authRouter;
