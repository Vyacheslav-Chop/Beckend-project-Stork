import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDiaryByIdController } from '../controllers/diaries.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateDiaryValidationSchema } from '../validation/diary.js';
import { isValidId } from '../middlewares/isValidId.js';

const diaryRouter = Router();
diaryRouter.use('/', authenticate);

diaryRouter.use('/:diaryId', isValidId('diaryId'));

diaryRouter.patch(
  '/:diaryId',
  validateBody(updateDiaryValidationSchema),
  ctrlWrapper(updateDiaryByIdController),
);

export default diaryRouter;
