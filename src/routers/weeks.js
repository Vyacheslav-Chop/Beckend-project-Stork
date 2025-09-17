import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getWeekPublicController } from '../controllers/weeks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

export default weekRouter;
