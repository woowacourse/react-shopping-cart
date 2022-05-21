import { BASE_URL } from 'apis';
import type { PathParams } from 'msw';
import { rest } from 'msw';
import { CartItem, Item } from 'types/domain';

export const handlers = [
  rest.get<null, null, Item[]>(`${BASE_URL}/itemList`, (req, res, ctx) => {
    const page = req.url.searchParams.get('_page');
    const limit = req.url.searchParams.get('_limit');

    if (page && limit) {
      return res(ctx.status(200), ctx.json(itemList.slice(0, 12)));
    }

    return res(ctx.status(200), ctx.json(itemList));
  }),

  rest.get<null, PathParams, Item>(`${BASE_URL}/itemList/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.status(200), ctx.json(itemList[Number(id) - 1]));
  }),

  rest.get<null, null, CartItem[]>(`${BASE_URL}/cartList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post<CartItem, null, CartItem>(`${BASE_URL}/cartList`, (req, res, ctx) => {
    const item = req.body;

    cartList = [...cartList, item];

    return res(ctx.status(200), ctx.json(item));
  }),

  rest.put<CartItem, PathParams, CartItem>(`${BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const item = req.body;

    cartList = cartList.map(cart => (cart.id === Number(id) ? item : cart));

    return res(ctx.status(200), ctx.json(item));
  }),

  rest.patch<{ isSelected: boolean }, PathParams, CartItem>(
    `${BASE_URL}/cartList/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const body = req.body;
      const item = cartList.find(cart => cart.id === Number(id));
      const newCartItem = { ...item, ...body };

      cartList = cartList.map(cart => (cart.id === Number(id) ? newCartItem : cart));

      return res(ctx.status(200), ctx.json(newCartItem));
    }
  ),

  rest.delete<null, PathParams, null>(`${BASE_URL}/cartList/:id`, (req, res, ctx) => {
    const { id } = req.params;

    cartList = cartList.filter(cart => cart.id !== Number(id));

    return res(ctx.status(200));
  }),
];

// mock data
export const itemList = [
  {
    id: 1,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 2,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 3,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 4,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 5,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 6,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 7,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 8,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 9,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 10,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 11,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 12,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 13,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 14,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 15,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 16,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 17,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 18,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 19,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 20,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 21,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 22,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 23,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 24,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 25,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 26,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 27,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 28,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 29,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 30,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 31,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 32,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 33,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 34,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 35,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 36,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 37,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 38,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 39,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 40,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 41,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 42,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 43,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 44,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 45,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 46,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 47,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 48,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 49,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 50,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 51,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 52,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 53,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 54,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 55,
    thumbnailUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 56,
    thumbnailUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 57,
    thumbnailUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 58,
    thumbnailUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 59,
    thumbnailUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 60,
    thumbnailUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 61,
    thumbnailUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 62,
    thumbnailUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 63,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 64,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 65,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
  {
    id: 66,
    thumbnailUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    title: 'mocking',
    price: 43000,
  },
];

// eslint-disable-next-line prefer-const
export let cartList = [
  {
    id: 1,
    quantity: 1,
    isSelected: true,
  },
  {
    id: 2,
    quantity: 1,
    isSelected: true,
  },
  {
    id: 15,
    quantity: 1,
    isSelected: false,
  },
  {
    id: 12,
    quantity: 1,
    isSelected: false,
  },
  {
    id: 10,
    quantity: 1,
    isSelected: false,
  },
];
