import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { geetWeekPublic } from '../controllers/weeks.js';

const weekRouter = Router();

weekRouter.get('/public', geetWeekPublic);

weekRouter.use(authenticate);

export default weekRouter;
