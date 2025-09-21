import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { weekParamSchema } from '../validation/week.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getWeeksMomStatesController,
  getWeekPublicController,
  getBabyStateByWeekController,
  pregnancyController,
} from '../controllers/weeks.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

weekRouter.get(
  '/baby-state',
  validateQuery(weekParamSchema),
  ctrlWrapper(getBabyStateByWeekController),
);

weekRouter.get('/private', ctrlWrapper(pregnancyController));
weekRouter.get(
  '/mom-state',
  validateQuery(weekParamSchema),
  ctrlWrapper(getWeeksMomStatesController),
);

export default weekRouter;
