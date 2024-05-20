type BasicToken = string;
export const generateBasicToken = (userId: string, userPassword: string): BasicToken => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};
