import { rest } from 'msw';
import { productList } from 'assets/mock';

let cartList = [];

export const handlers = [
  rest.get('/productList/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = productList.find((product) => product.id === +id);
    return res(ctx.json(product));
  }),

  rest.get('/productList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/cartList', (req, res, ctx) => {
    const newSimpleProduct = req.body;
    // 카트에 담는 상품의 id와 수량만 API에 전달하면
    // API에서 API 내부의 수량을 증가하는 로직
    // get
    const isExists =
      cartList.findIndex(({ id }) => id === newSimpleProduct.id) !== -1;
    if (isExists) {
      // put
      cartList = cartList.map((product) =>
        product.id === newSimpleProduct.id
          ? { ...product, cartQuantity: product.cartQuantity + 1 }
          : product,
      );
    } else {
      // post
      cartList.push(newSimpleProduct);
    }
    return res(ctx.status(201));
  }),

  rest.get('/cartList', (req, res, ctx) => {
    const result = cartList.map((simpleProduct) => {
      const newFullProduct = productList.find(
        (product) => product.id === +simpleProduct.id,
      );
      newFullProduct.cartQuantity = simpleProduct.cartQuantity;
      return newFullProduct;
    });
    return res(ctx.status(200), ctx.json(result));
  }),
];
