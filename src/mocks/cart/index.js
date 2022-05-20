import { rest } from 'msw';

import { products } from 'mocks/product';

export const cartProducts = [
  {
    product_id: 1,
    cart_product_count: 1,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    product_title: '배달이친구들 케이블타이',
    product_price: 4000,
  },
  {
    product_id: 11,
    cart_product_count: 1,
    product_img_src:
      'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    product_title: '엽서. 복',
    product_price: 1000,
  },
];

export const cartHandler = [
  rest.get('/mocking/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(cartProducts));
  }),
  rest.post('/mocking/cart', (req, res, ctx) => {
    if (cartProducts.find((product) => product.product_id === Number(req.body))) {
      return res(ctx.status(202), ctx.delay(1000), ctx.json('same product in cart'));
    }
    const addProduct = products.find((product) => product.product_id === Number(req.body));
    const cartInitProduct = Object.assign(addProduct, { cart_product_count: 1 });

    cartProducts.push(cartInitProduct);

    return res(ctx.status(200));
  }),
  rest.delete('/mocking/cart', (req, res, ctx) => {
    if (cartProducts.some((product) => product.product_id === Number(req.body))) {
      return res(ctx.status(400), ctx.json('Error, wrong product id'));
    }

    const deleteProductIndex = cartProducts.findIndex(
      (product) => product.product_id === Number(req.body),
    );
    cartProducts.splice(deleteProductIndex + 1, 1);

    return res(ctx.status(200), ctx.json(cartProducts));
  }),
  rest.patch('/mocking/cart', (req, res, ctx) => {
    cartProducts.find((product) =>
      product.product_id === Number(req.body.product_id)
        ? (product.cart_product_count = Number(req.body.product_count))
        : '',
    );
    return res(ctx.status(200), ctx.json(cartProducts));
  }),
];
