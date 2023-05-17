import { rest } from 'msw';
import productJson from './data/productList.json';
import cartListJson from './data/cartList.json';
// 초기 상품 목록
const products = productJson.choonsikProducts;
const cartLists = cartListJson.cartList;

export const handlers = [
  // 상품 목록 조회 API
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  // 상품 조회 API
  // rest.get('/api/products/:productId}', (req, res, ctx) => {
  //   const { productId } = req.params;

  //   const product = products.find(({ id }) => id === Number(productId)) ?? null;

  //   if (product) {
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         message: `${productId} product can not found`,
  //       })
  //     );
  //   }

  //   return res(ctx.status(200), ctx.json(product));
  // }),
  // 상품 추가 API
  // rest.post("/"),
  // 장바구니 조회 API
  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartLists));
  }),
];
