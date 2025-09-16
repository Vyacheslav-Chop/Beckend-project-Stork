import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";
import userRouter from "./users.js";
import diaryRouter from "./diaries.js";
import weekRouter from "./week.js";
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/tasks', authenticate, taskRouter);

router.use('/users', authenticate, userRouter);

router.use('/diaries', authenticate, diaryRouter);

router.use('/weeks', authenticate, weekRouter);

export default router;
