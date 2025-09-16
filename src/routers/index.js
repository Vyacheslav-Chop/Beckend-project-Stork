import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";
import userRouter from "./users.js";
import diaryRouter from "./diaries.js";
import weekRouter from "./weeks.js";
import emotionRouter from "./emotions.js";


const router = Router();

router.use('/auth', authRouter);

router.use('/tasks', taskRouter);

router.use('/users', userRouter);

router.use('/diaries', diaryRouter);

router.use('/emotions', emotionRouter);

router.use('/weeks', weekRouter);

export default router;
