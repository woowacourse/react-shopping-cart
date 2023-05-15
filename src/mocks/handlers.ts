import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import productListData from '../data/mockData.json';
import { CartItemData, PostCartItemRequestBody, ProductItemData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const getCartData = () => {
  return getFromLocalStorage<CartItemData[]>(CART_LIST_LOCAL_STORAGE_KEY) ?? [];
};

const setCartData = (newCartList: CartItemData[]) => {
  saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, newCartList);
};

const changeCartItemQuantity = (cartList: CartItemData[], productId: number, quantity: number) => {
  const selectedCartItemIndex = cartList.findIndex((cartItem) => cartItem.product.id === productId);

  if (selectedCartItemIndex === -1) {
    const newCartId = Number(new Date());
    const product = productListData.find((productItem) => productItem.id === productId)!;

    return [...cartList, { id: newCartId, quantity, product }];
  }

  const updatedCartList = [
    ...cartList.slice(0, selectedCartItemIndex),
    {
      ...cartList[selectedCartItemIndex],
      quantity: quantity + cartList[selectedCartItemIndex].quantity,
    },
    ...cartList.slice(selectedCartItemIndex + 1),
  ];

  return updatedCartList;
};

const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json<ProductItemData[]>(productListData));
  }),

  rest.get('/api/carts', (req, res, ctx) => {
    const cartList = getFromLocalStorage<CartItemData[]>(CART_LIST_LOCAL_STORAGE_KEY);

    return res(ctx.delay(2000), ctx.status(200), ctx.json<CartItemData[]>(cartList));
  }),

  rest.post('/api/carts/add', async (req, res, ctx) => {
    const { productId, quantity } = await req.json<PostCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = changeCartItemQuantity(currentCartData, productId, quantity);
    setCartData(newCartList);

    return res(ctx.status(200), ctx.json<CartItemData[]>(newCartList));
  }),
];

export { handlers };
