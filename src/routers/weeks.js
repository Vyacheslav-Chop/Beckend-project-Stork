import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getBabyStateByWeek } from '../controllers/weeks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { weekParamSchema } from '../validation/week.js';
import { validateParams } from '../middlewares/validateParams.js';

const weekRouter = Router();

weekRouter.use(authenticate);
weekRouter.get(
  '/:week',
  validateParams(weekParamSchema),
  ctrlWrapper(getBabyStateByWeek),
);

export default weekRouter;
