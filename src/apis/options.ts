import { USER_TOKEN } from './env';

export const CART_HEADER = {
  Authorization: `Basic ${USER_TOKEN}`,
  'content-type': 'application/json',
};
