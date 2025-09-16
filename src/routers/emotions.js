import { Router } from 'express';
import { getAllEmotionsController } from '../controllers/emotions.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const emotionRouter = Router();

emotionRouter.get('/', ctrlWrapper(getAllEmotionsController));

export default emotionRouter;
