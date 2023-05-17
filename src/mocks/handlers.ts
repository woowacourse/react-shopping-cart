import { rest } from 'msw';

import { Product } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { PRODUCTS_URL } from '@Constants/index';

import mockData from './mockData.json';

export const handlers = [
  rest.get(PRODUCTS_URL, (_, res, ctx) => {
    if (!localStorageHelper.hasKey('products')) localStorageHelper.setInitValue('products', mockData);

    const products = localStorageHelper.getValue<Product[]>('products');

    return res(ctx.status(200), ctx.json(products));
  }),
];
