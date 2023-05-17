import { ServerCartItem } from '../../types/Cart';
import products from '../data/products.json';

const KEY = 'MSW_CART';

const getList = (): ServerCartItem[] => {
  const storageData = localStorage.getItem(KEY);
  return storageData ? JSON.parse(storageData) : [];
};

const setItem = (productId: number, quantity: number) => {
  const cart = getList();

  const productIndexAtCart = cart.findIndex(({ id }) => id === productId);
  const productInfo = products.find(({ id }) => id === productId);

  if (!productInfo) return;

  if (productIndexAtCart < 0) {
    cart.push({
      id: productId,
      quantity,
      product: productInfo,
    });
  } else {
    cart[productIndexAtCart].quantity = quantity;
  }

  const newCart = cart
    .filter((item) => item.quantity > 0)
    .sort((one, another) => one.id - another.id);

  localStorage.setItem(KEY, JSON.stringify(newCart));
};

const Cart = { getList, setItem };

export default Cart;
