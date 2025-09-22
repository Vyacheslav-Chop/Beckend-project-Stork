export const buildTasksFilter = (query) => {
  const filter = {};

  if ('isDone' in query) {
    filter.isDone = query.isDone === true || query.isDone === 'true';
  }

  return filter;
};
