import { rest } from 'msw';
import { products } from './data';

let cart = [
  {
    id: 1,
    quantity: 5,
    product: {
      id: 1,
      name: '[23 F/W] Tom Brown',
      price: 930000,
      imageUrl:
        'https://image.msscdn.net/images/goods_img/20221017/2867105/2867105_1_220.jpg',
    },
  },
];

const getProducts = rest.get('/products', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(products));
});

const getCartItems = rest.get('/cart-items', (_, res, ctx) => {
  return res(ctx.status(200), ctx.json(cart));
});

const postCartItem = rest.post('/cart-items/:cartItemId', (req, res, ctx) => {
  // 카트 아이템이 존재할 경우
  // 카트 아이템이 존재하지 않을 경우
});

const deleteCartItem = rest.delete(
  '/cart-items/:cartItemId',
  (req, res, ctx) => {
    cart = cart.filter((cartItem) => cartItem.id === +req.params.cartItemId);
  }
);

const getProduct = rest.get('/products/:productId', (req, res, ctx) => {
  const product = products.find(
    (product) => product.id === +req.params.productId
  );
  // TODO: 에러처리 스펙에 맞게 변경
  const responseData = product ?? {
    errorMsg: 'no exist data',
  };
  return res(ctx.status(200), ctx.json(responseData));
});

const putProduct = rest.put('/products/:productId', (req, res, ctx) => {
  let matchProduct = products.find(
    (product) => product.id === +req.params.productId
  );

  if (!matchProduct) {
    return res(
      ctx.status(400),
      ctx.json({
        errorMsg: 'no exist data',
      })
    );
  }
  // TODO: 성공일 때 구체화 하기
  return res(ctx.status(200));
});

export const handlers = [
  getProducts,
  getCartItems,
  postCartItem,
  deleteCartItem,
  getProduct,
  putProduct,
];
