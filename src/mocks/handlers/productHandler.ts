import { rest } from 'msw';
import products from './productData';

export default function handlers() {
  return [rest.get('/products', getProducts), rest.get('products/:id', getProductDetail)];
}

const getProducts: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(ctx.delay(3000), ctx.status(200), ctx.json({ response: [...products] }));
};

const getProductDetail: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const productId = parseInt(req.params.id as string, 10);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res(ctx.status(404), ctx.json({ message: 'Product not found.' }));
  }
  return res(ctx.status(200), ctx.json({ response: product }));
};
