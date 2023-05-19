import { rest } from 'msw';

import { API_ENDPOINT } from '../../constants/api';
import productListData from '../../data/mockData.json';
import { ProductItemData } from '../../types';

const productHandlers = [
  rest.get(API_ENDPOINT.PRODUCTS_GET, (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json<ProductItemData[]>(productListData));
  }),
];

export { productHandlers };
