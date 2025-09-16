import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const diaryRouter = Router();
diaryRouter.use('/', authenticate);

export default diaryRouter;
