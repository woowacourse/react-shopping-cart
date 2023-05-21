import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import { joinPath } from '../../api/utils/http';

type CartResponse = CartItemEntity[];

const cart: Omit<CartResponse, 'productId'> = [
  {
    id: 1,
    quantity: 5,
    product: {
      id: 2,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: `/images/products/2.png`,
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 8,
      name: 'PET보틀-원형(600ml)',
      price: 44500,
      imageUrl: `/images/products/8.png`,
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 10,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: `/images/products/10.png`,
    },
  },
].map((cartItem) => ({
  ...cartItem,
  product: {
    ...cartItem.product,
    imageUrl: joinPath(import.meta.env.BASE_URL, cartItem.product.imageUrl),
  },
}));

export default cart;
