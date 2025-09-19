import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { weekParamSchema } from '../validation/week.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getWeeksMomStatesController,
  getWeekPublicController,
  getBabyStateByWeekController,
  getWeekPrivateController,
} from '../controllers/weeks.js';

const weekRouter = Router();

weekRouter.get('/public', ctrlWrapper(getWeekPublicController));

weekRouter.use(authenticate);

weekRouter.get(
  '/baby-state',
  validateQuery(weekParamSchema),
  ctrlWrapper(getBabyStateByWeekController),
);

weekRouter.get('/private', ctrlWrapper(getWeekPrivateController));
weekRouter.get(
  '/mother-body',
  validateQuery(weekParamSchema),
  ctrlWrapper(getWeeksMomStatesController),
);

export default weekRouter;
