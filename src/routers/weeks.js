import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWeeksMomStatesController, getWeekPublicController } from '../controllers/weeks.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

weekRouter.get('/mother-body', ctrlWrapper(getWeeksMomStatesController));

export default weekRouter;
