import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDiaryByIdController, getDiariesController } from '../controllers/diaries.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateDiaryValidationSchema, getDiariesQuerySchema } from '../validation/diary.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateQuery } from '../middlewares/validateQuery.js';

const diaryRouter = Router();
diaryRouter.use('/', authenticate);

diaryRouter.get(
  '/',
  validateQuery(getDiariesQuerySchema),
  ctrlWrapper(getDiariesController),
);

diaryRouter.use('/:diaryId', isValidId('diaryId'));

diaryRouter.patch(
  '/:diaryId',
  validateBody(updateDiaryValidationSchema),
  ctrlWrapper(updateDiaryByIdController),
);

export default diaryRouter;
