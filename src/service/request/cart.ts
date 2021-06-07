import axios from 'axios';
import { CUSTOMER_NAME } from '../../constants/API';
import { CartItem, CartItemResponse } from '../../types';

interface IncompleteCartItem {
  id: string;
  price: number;
  name: string;
  image: string;
}

export const requestShoppingCartItemList = async (): Promise<IncompleteCartItem[]> => {
  const { data: cartItemList } = await axios.get<CartItemResponse[]>(
    `/api/customers/${CUSTOMER_NAME}/carts`
  );

  const processedCartItemList: IncompleteCartItem[] = cartItemList.map((item) => {
    return {
      id: String(item.cart_id),
      price: item.price,
      name: item.name,
      image: item.image_url,
    };
  });

  return Promise.resolve(processedCartItemList);
};

//TODO: Id -> ID
export const requestShoppingCartItemToAdd = async (productId: string): Promise<string> => {
  const {
    headers: { location },
  } = await axios.post(`/api/customers/${CUSTOMER_NAME}/carts`, {
    product_id: productId,
  });

  const cartId = location.match(/[0-9]+$/)[0];

  return Promise.resolve(cartId);
};

export const requestShoppingCartItemToDelete = (cartItemId: string) =>
  axios.delete(`/api/customers/${CUSTOMER_NAME}/carts/${cartItemId}`);

//TODO: 이거 localstorage로 처리하기
export const requestAllShoppingCartItemToBeChecked = (items: CartItem[], checked: boolean) => {
  Promise.all(
    items.map((item) => axios.put<CartItem>(`/cart/${item.id}`, { ...item, checked }))
  );
};

export const requestShoppingCartItemsToDelete = (items: CartItem[]) => {
  Promise.all(items.map((item) => requestShoppingCartItemToDelete(item.id)));
};

export const requestShoppingCartItemsToClear = async () => {
  const cartItems = await requestShoppingCartItemList();

  console.log('흠');

  return Promise.all(cartItems.map((cartItem) => requestShoppingCartItemToDelete(cartItem.id)));
};
