import Task from '@/models/Task';

export const createTask = async (userId, data) => {
  return await Task.create({ ...data, userId });
};

export const getUserTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};
