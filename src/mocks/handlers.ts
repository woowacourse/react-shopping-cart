import { rest } from 'msw';
import { CartItemType, ProductItemType } from '../types/ProductType';

const productList: ProductItemType[] = [
  {
    id: 1,
    name: '1) PET보틀-정사각(420ml) 정말 길고 긴 제목',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 2,
    name: '2) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 3,
    name: '3) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 4,
    name: '4) PET보틀-납작(450ml)',
    price: 10000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 5,
    name: '5) PET보틀-단지(480ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 6,
    name: '6) PET보틀-납작(260ml)',
    price: 61800,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 7,
    name: '7) PET보틀-원형(500ml)',
    price: 42200,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 8,
    name: '8) PET보틀-원형(600ml)',
    price: 44500,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 9,
    name: '9) PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 10,
    name: '10) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 11,
    name: '11) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 12,
    name: '12) PET보틀-납작(450ml)',
    price: 39900,
    imageUrl: 'http://placekitten.com/200/200',
  },
];

let cartList: CartItemType[] = [
  {
    id: 3,
    quantity: 5,

    product: {
      id: 3,
      name: 'PET보틀-정사각(370ml)',
      price: 41000,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
  {
    id: 1,
    quantity: 10,

    product: {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
  {
    id: 10,
    quantity: 3,

    product: {
      id: 10,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
];

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(productList));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(cartList));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId: idData } = await req.json();
    const productId = Number(idData);

    const product = productList.find((product) => product.id === productId);

    // TODO: 에러처리
    if (cartList.some(({ id }) => id === productId)) return;

    if (product) {
      cartList.push({
        id: productId,
        quantity: 1,
        product: product,
      });
    }

    return res(ctx.delay(500), ctx.status(200), ctx.json('SUCCESS'));
  }),

  rest.delete('/cart-items/:productId', async (req, res, ctx) => {
    const { productId: idData } = req.params;
    const productId = Number(idData);

    cartList = cartList.filter((product) => product.id !== productId);

    return res(ctx.delay(500), ctx.status(200), ctx.json('SUCCESS'));
  }),

  rest.patch('/cart-items/:productId', async (req, res, ctx) => {
    const { productId: idData } = req.params;
    const productId = Number(idData);

    const { quantity: quantityData } = await req.json();
    const quantity: number = quantityData;

    cartList = cartList.map((cartProduct) => {
      if (cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity,
        };
      } else {
        return cartProduct;
      }
    });

    return res(ctx.delay(500), ctx.status(200), ctx.json('SUCCESS'));
  }),
];
