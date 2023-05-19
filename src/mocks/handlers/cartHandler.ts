import { rest, RestRequest } from 'msw';
import { products } from '../../components/data/mockData';
import { Cart } from '../../types/product';

interface PatchRequest extends RestRequest {
  quantity: number;
}

export const cartHandler = [
  rest.get('/cart-items', async (_req, res, ctx) => {
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');

    return res(ctx.json(data));
  }),
  rest.get('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const carts = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const product = Object.assign(
      carts.find((cart: Cart) => cart.id === Number(id))
    );

    return res(ctx.json(product));
  }),
  rest.post<{ id: number }>('/cart-items', async (req, res, ctx) => {
    const { id } = req.body;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const product = products.find((product) => product.id === Number(id));

    if (product) {
      const newProduct = [...data, { id: Number(id), quantity: 1, product }];
      localStorage.setItem('cart-items', JSON.stringify(newProduct));
      return res(ctx.json(newProduct));
    }
    return res(ctx.status(404));
  }),
  rest.patch<PatchRequest, { id: string }>(
    '/cart-items/:id',
    async (req, res, ctx) => {
      const { id } = req.params;
      const { quantity } = req.body;
      const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
      const filteredData = data.filter((item: Cart) => item.id !== Number(id));
      const product = products.find((product) => product.id === Number(id));

      if (product) {
        const newProduct = [
          ...filteredData,
          { id: Number(id), quantity: quantity + 1, product },
        ];
        localStorage.setItem('cart-items', JSON.stringify(newProduct));
        return res(ctx.json(newProduct));
      }
      return res(ctx.status(404));
    }
  ),
  rest.delete('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const filteredData = data.filter((item: Cart) => item.id !== Number(id));
    const newData = [...filteredData];

    localStorage.setItem('cart-items', JSON.stringify(newData));

    return res(ctx.json(newData));
  }),
];
