import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWeeksMomStatesController, geetWeekPublic, getWeekPrivate } from '../controllers/weeks.js';


const weekRouter = Router();

weekRouter.get('/public', geetWeekPublic);

weekRouter.use(authenticate);

weekRouter.get('/private', getWeekPrivate);

weekRouter.get('/mother-body', ctrlWrapper(getWeeksMomStatesController));

export default weekRouter;
