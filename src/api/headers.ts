import { USER_ID, USER_PASSWORD } from '.';

const generateBasicToken = (userId: string, userPassword: string): string => {
  const token = btoa(`${userId}:${userPassword}`);

  return `Basic ${token}`;
};

export const getHeadersWithPayload = () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  return {
    Authorization: token,
    'Content-Type': 'application/json',
  };
};

export const getHeadersWithoutPayload = () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  return {
    Authorization: token,
  };
};
