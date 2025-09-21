import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteDiaryByIdController,
  updateDiaryByIdController,
  getDiariesController,
  createDiaryController,
} from '../controllers/diaries.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  updateDiaryValidationSchema,
  createDiaryValidationSchema,
  getDiariesQuerySchema,
} from '../validation/diary.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateQuery } from '../middlewares/validateQuery.js';

const diaryRouter = Router();

diaryRouter.use('/', authenticate);

diaryRouter.use('/:diaryId', isValidId('diaryId'));

diaryRouter.post(
  '/',
  validateBody(createDiaryValidationSchema),
  ctrlWrapper(createDiaryController),
);

diaryRouter.get(
  '/',
  validateQuery(getDiariesQuerySchema),
  ctrlWrapper(getDiariesController),
);

diaryRouter.patch(
  '/:diaryId',
  validateBody(updateDiaryValidationSchema),
  ctrlWrapper(updateDiaryByIdController),
);

diaryRouter.delete('/:diaryId', ctrlWrapper(deleteDiaryByIdController));

export default diaryRouter;

