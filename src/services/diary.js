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

export const findPaginatedDiariesByUser = async (userId, { page, limit, sortBy, order }) => {
  const filter = { userId };
  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    DiaryModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('category')
      .populate('userId'),
    DiaryModel.countDocuments(filter),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
    results: items,
  };
};
