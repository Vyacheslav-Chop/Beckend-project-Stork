import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserController } from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

export default authRouter;
