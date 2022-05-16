import { rest } from 'msw';
import { productList } from 'assets/mock';

const cartList = [];

// const addCartList = (cartList, newCartItem) => {
//   const isExisted =
//     cartList.findIndex(({ id }) => id === newCartItem.id) !== -1;

//   if (isExisted) {
//     return cartList.map((item) => {
//       if (item.id === newCartItem.id) {
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     });
//   }

//   return [...cartList, newCartItem];
// };

export const handlers = [
  rest.get('/product/:id', (req, res, ctx) => {
    console.log(req);
    const { id } = req.params;
    const product = productList.find((product) => product.id === +id);

    return res(ctx.json(product));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/cart', (req, res, ctx) => {
    console.log('req.body', req.body);
    // console.log(req);
    // TODO
    // const newCartItem = req.body;
    // const isExisted =
    //   cartList.findIndex(({ id }) => id === newCartItem.id) !== -1;

    // if (isExisted) {
    //   return cartList.map((item) => {
    //     if (item.id === newCartItem.id) {
    //       return { ...item, quantity: item.quantity + 1 };
    //     }
    //     return item;
    //   });
    // }
    cartList.push(req.body);
    // console.log('cartList', cartList);
    return res(ctx.status(201));
  }),

  rest.get('/cart', (req, res, ctx) => {
    // TODO
    console.log('productList', productList);
    console.log('cartList', cartList);
    const result = cartList.map((item) => {
      const newItem = productList.find((product) => product.id === +item.id);
      newItem.cartQuantity = item.quantity;
      return newItem;
    });
    return res(ctx.status(200), ctx.json(result));
  }),
];
