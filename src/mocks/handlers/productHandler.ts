import { rest } from 'msw';
import products from './productData';

export default function handlers() {
  return [
    rest.get('/products', getProducts),
    rest.get('products/:id', getProductDetail),
    rest.post('/products', createProduct),
    rest.put('/products/:id', updateProduct),
    rest.delete('/products/:id', deleteProduct),
  ];
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

interface CreateProductReqBody {
  name: string;
  price: number;
  imageUrl: string;
}

const createProduct: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  const { name, price, imageUrl } = req.body as CreateProductReqBody;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    imageUrl,
  };
  products.push(newProduct);
  return res(ctx.status(201), ctx.json({ response: newProduct }));
};

const updateProduct: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  const productId = parseInt(req.params.id as string, 10);
  const { name, price, imageUrl } = req.body as CreateProductReqBody;
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res(ctx.status(404), ctx.json({ message: 'Product not found.' }));
  }
  const updatedProduct = {
    ...products[productIndex],
    name,
    price,
    imageUrl,
  };
  products[productIndex] = updatedProduct;
  return res(ctx.status(200), ctx.json({ response: updatedProduct }));
};

const deleteProduct: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  const productId = parseInt(req.params.id as string, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res(ctx.status(404), ctx.json({ message: 'Product not found.' }));
  }
  products.splice(productIndex, 1);
  return res(ctx.status(204), ctx.json({ message: 'No Content' }));
};
