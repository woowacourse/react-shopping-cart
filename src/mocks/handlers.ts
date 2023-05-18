import { rest } from 'msw';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Cart } from 'types';
import productList from './productList.json';

const { getLocalStorageData, setLocalStorageData } = useLocalStorage();

const cartListStorage = getLocalStorageData<Cart[]>('cartList');
const cartData = { cartList: [...cartListStorage] };

export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  rest.get('/api/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartData));
  }),

  rest.post('/api/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();
    const productItem = productList.choonsik.find(
      (product) => product.id === productId
    );
    if (!productItem) return;

    const cartItem = { id: productId, product: productItem, quantity: 1 };
    cartData.cartList = [...cartData.cartList, cartItem];

    setLocalStorageData<Cart[]>('cartList', cartData.cartList);

    return res(ctx.status(201));
  }),
];
