import { Product } from '@customTypes/Product';
import { rest } from 'msw';

const products = [
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

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

const cartItems: CartItem[] = [];

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return products
      ? res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json(products)
        )
      : res(ctx.status(204));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return cartItems
      ? res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json(cartItems)
        )
      : res(ctx.status(204));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const data = await req.json();
    const product = products.find(product => product.id === data.productId);

    if (!product) {
      return res(ctx.status(204));
    }

    const newCartItem = {
      id: cartItems.length + 1,
      quantity: 1,
      product: product,
    };
    cartItems.push(newCartItem);

    return res(
      ctx.status(201),
      ctx.set('Location', `/${cartItems.length + 1}`)
    );
  }),

  rest.patch('/cart-items/:id', async (req, res, ctx) => {
    const cartItemId = Number(req.params.id);
    const quantity = await req.json();
    const cartItem = cartItems.find(cartItem => cartItem.id === cartItemId);

    if (!cartItem) {
      return res(ctx.status(204));
    }

    cartItem.quantity = quantity;
    return res(ctx.status(200));
  }),

  rest.delete('/cart-items/:id', async (req, res, ctx) => {
    const cartItemId = Number(req.params.id);
    const foundId = cartItems.findIndex(cartItem => cartItem.id === cartItemId);

    if (foundId === -1) {
      return res(ctx.status(204));
    }

    cartItems.splice(foundId, 1);

    return res(ctx.status(204));
  }),
];
