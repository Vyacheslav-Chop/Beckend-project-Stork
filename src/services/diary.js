import { DiaryModel } from '../db/models/diary.js';

export const updateDiaryById = async (diaryId, payload) => {
  const diary = await DiaryModel.findOneAndUpdate({ _id: diaryId }, payload, {
    new: true,
    runValidators: true,
  })
    .populate('category')
    .populate('userId');

  return diary;
};

export const getDiaries = async (userId, { sortBy, order }) => {
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const items = await DiaryModel.find({ userId }).sort(sort).lean();
  return items;
};

export const createDiary = async (payload) => {
  const diary = await DiaryModel.create(payload);

  return diary;
};
