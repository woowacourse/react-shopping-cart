import {rest} from 'msw';
import productList from 'assets/mockData';

let cart = [];

export const handlers = [
  rest.get('/products/:id', (req, res, ctx) => {
    const {id} = req.params;

    const product = productList.find(({id: productId}) => productId === +id);
    if (!product) return res(ctx.status(400));
    return res(ctx.json(product));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(productList));
  }),
  rest.post('/cart/:id', (req, res, ctx) => {
    // id로 담겨 있는지 확인하고 없으면 바로 저장, 아니면 수량 추가
    const productId = req.params.id;
    const isCarted = cart.some(({id}) => id === productId);

    if (!isCarted) {
      cart.push({id: productId, quantity: 1});
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      });
      cart = updatedCart;
    }
    return res(ctx.status(200), ctx.json(cart));
  }),
  rest.get('/cart', (req, res, ctx) => {
    // detail 정보를 담은 cart
    const detailCart = cart.map((cartItem) => {
      const productDetail = productList.find((item) => item.id === +cartItem.id);

      return {...productDetail, quantity: cartItem.quantity};
    });

    return res(ctx.json(detailCart));
  }),
  rest.delete('/cart/:id', (req, res, ctx) => {
    const {id} = req.params;
    const deletedCart = cart.filter((item) => item.id !== id);
    cart = deletedCart;

    const detailCart = cart.map((cartItem) => {
      const productDetail = productList.find((item) => item.id === +cartItem.id);

      return {...productDetail, quantity: cartItem.quantity};
    });
    return res(ctx.status(200), ctx.json(detailCart));
  }),
  rest.put('/cart/:id', (req, res, ctx) => {
    // id로 담겨 있는지 확인하고 없으면 바로 저장, 아니면 수량 추가
    const productId = req.params.id;

    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {...item, quantity: req.body.quantity};
      }
      return item;
    });
    cart = updatedCart;

    const detailCart = cart.map((cartItem) => {
      const productDetail = productList.find((item) => item.id === +cartItem.id);

      return {...productDetail, quantity: cartItem.quantity};
    });
    return res(ctx.status(200), ctx.json(detailCart));
  }),
];
