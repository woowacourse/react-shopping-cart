import { rest } from 'msw';

const productList = [
  {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat0.png',
  },
  {
    id: 2,
    name: 'PET보틀-정사각(500ml)',
    price: 12000,
    imageUrl: '/react-shopping-cart/cat1.png',
  },
  {
    id: 3,
    name: 'PET보틀-원형(350ml)',
    price: 8000,
    imageUrl: '/react-shopping-cart/cat2.png',
  },
  {
    id: 4,
    name: 'PET보틀-원형(500ml)',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat3.png',
  },
  {
    id: 5,
    name: '유리병-프랑스산(500ml)',
    price: 20000,
    imageUrl: '/react-shopping-cart/cat12.png',
  },
  {
    id: 6,
    name: '유리병-프랑스산(750ml)',
    price: 25000,
    imageUrl: '/react-shopping-cart/cat5.png',
  },
  {
    id: 7,
    name: '알루미늄병-순도100%(500ml)',
    price: 15000,
    imageUrl: '/react-shopping-cart/cat6.png',
  },
  {
    id: 8,
    name: '알루미늄병-순도100%(750ml)',
    price: 18000,
    imageUrl: '/react-shopping-cart/cat7.png',
  },
  {
    id: 9,
    name: '스테인리스병-한국제작(500ml)',
    price: 18000,
    imageUrl: '/react-shopping-cart/cat8.png',
  },
  {
    id: 10,
    name: '스테인리스병-한국제작(750ml)',
    price: 22000,
    imageUrl: '/react-shopping-cart/cat9.png',
  },
  {
    id: 11,
    name: '지퍼백-스몰사이즈(300ml)',
    price: 5000,
    imageUrl: '/react-shopping-cart/cat10.png',
  },
  {
    id: 12,
    name: '지퍼백-라지사이즈(1000ml)',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat11.png',
  },
  {
    id: 13,
    name: '고양이-1',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat12.png',
  },
  {
    id: 14,
    name: '고양이-2',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat13.png',
  },
  {
    id: 15,
    name: '고양이-3',
    price: 10000,
    imageUrl: '/react-shopping-cart/cat14.png',
  },
  {
    id: 16,
    name: '오리',
    price: 10000,
    imageUrl: '/react-shopping-cart/duck.png',
  },
];

const cartList = [];

export const handlers = [
  rest.get('/productList', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.post('/productList', (req, res, ctx) => {
    const newCartItem = req.json();

    cartList.push(newCartItem);
    return res(ctx.status(201));
  }),
];
