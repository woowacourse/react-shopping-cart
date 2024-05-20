export const generateBasicToken = (userId: string, userPassword: string): string => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};
