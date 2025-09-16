import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

const weekRouter = Router();

weekRouter.use(authenticate);

export default weekRouter;
