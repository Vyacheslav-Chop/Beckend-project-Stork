import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { weekParamSchema } from '../validation/week.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getWeeksMomStatesController,
  getWeekPublicController,
  getBabyStateByWeekController,
  getPrivateWeekDataController,
} from '../controllers/weeks.js';
import { validateParams } from '../middlewares/validateParams.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

weekRouter.get(
  '/baby-state/:week',
  validateParams(weekParamSchema),
  ctrlWrapper(getBabyStateByWeekController),
);

weekRouter.get('/private', ctrlWrapper(getPrivateWeekDataController));
weekRouter.get(
  '/mom-state/:week',
  validateParams(weekParamSchema),
  ctrlWrapper(getWeeksMomStatesController),
);

export default weekRouter;
