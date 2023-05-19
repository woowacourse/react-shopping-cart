import { rest } from 'msw';
import mockData from '../../public/mockData.json';
import { CartProduct } from '../types/product';
import { uuid } from '../utils/uuid';

const mockProducts = mockData.products;
const cartList: CartProduct[] = [];

interface PostAddCartRequest {
  productId: number;
}

export const productHandler = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),
];

export const cartHandler = [
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post<PostAddCartRequest>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;
    const product = mockProducts.find((product) => product.id === productId);

    if (!product) {
      return res(ctx.status(500));
    }

    const newCartItem = {
      id: uuid(),
      quantity: 1,
      product,
    };

    cartList.push(newCartItem);

    return res(ctx.status(201));
  }),
];
