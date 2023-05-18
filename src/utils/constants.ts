import { PATH_KEY } from 'src/types';

type PathType = (typeof PATH_KEY)[number];

export const PATH: Record<PathType, string> = {
  HOME: '/',
  SHOPPING_BASKET: '/shopping-basket',
};

export const DELEIVERY_COST = 3000;
