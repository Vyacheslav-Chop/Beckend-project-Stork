import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { weekParamSchema } from '../validation/week.js';
import { validateParams } from '../middlewares/validateParams.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getWeeksMomStatesController,
  getWeekPublicController,
  getBabyStateByWeekController,
  getWeekPrivateController,
  getBabyStateByWeek,
} from '../controllers/weeks.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

weekRouter.get(
  '/baby-state',
  validateParams(weekParamSchema),
  ctrlWrapper(getBabyStateByWeekController),
);

weekRouter.get('/private', ctrlWrapper(getWeekPrivateController));
weekRouter.get('/mother-body', ctrlWrapper(getWeeksMomStatesController));

export default weekRouter;
