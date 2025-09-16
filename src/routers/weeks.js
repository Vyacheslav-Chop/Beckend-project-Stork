import { Router } from 'express';

const weekRouter = Router();

weekRouter.use(authenticate);

export default weekRouter;
