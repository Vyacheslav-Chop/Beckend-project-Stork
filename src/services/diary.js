import { DiaryModel } from '../db/models/diary.js';

export const updateDiaryById = async (diaryId, userId, payload) => {
  const diary = await DiaryModel.findOneAndUpdate(
    { _id: diaryId, owner: userId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  ).populate('category');

  return diary;
};

export const deleteDiaryById = async (diaryId, owner) => {
  const diary = await DiaryModel.findOneAndDelete({
    _id: diaryId,
    owner,
  });
  return diary;
};

export const getDiaries = async ({ userId, sortBy, order }) => {
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const items = await DiaryModel.find({ owner: userId })
    .sort(sort)
    .populate('category')
    .lean();
  return items;
};

export const createDiary = async (payload) => {
  const diary = await DiaryModel.create(payload);

  return await diary.populate('category');
};
