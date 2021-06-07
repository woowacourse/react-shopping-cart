import { CUSTOMER_NAME } from '../../appConfig';
import { CartItem, CartItemResponse } from '../../types';
import customAxios from '../../utils/API';

interface IncompleteCartItem {
  id: string;
  price: number;
  name: string;
  image: string;
}

//get request
export const requestShoppingCartItemList = async (): Promise<IncompleteCartItem[]> => {
  const { data: cartItemList } = await customAxios.get<CartItemResponse[]>(
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

//post request
export const requestShoppingCartItemToAdd = async (productId: string): Promise<string> => {
  const {
    headers: { location },
  } = await customAxios.post(`/api/customers/${CUSTOMER_NAME}/carts`, {
    product_id: Number(productId),
  });

  const cartId = location.match(/[0-9]+$/)[0];

  return Promise.resolve(cartId);
};

//delete request
//TODO: 링크 일부러 오류냄
export const requestShoppingCartItemToDelete = (cartItemId: string) =>
  customAxios.delete(`/api/customers/${CUSTOMER_NAME}/carts/${cartItemId}`);

export const requestShoppingCartItemsToDelete = (items: CartItem[]) => {
  Promise.all(items.map((item) => requestShoppingCartItemToDelete(item.id)));
};

export const requestShoppingCartItemsToClear = async () => {
  const cartItems = await requestShoppingCartItemList();

  return Promise.all(cartItems.map((cartItem) => requestShoppingCartItemToDelete(cartItem.id)));
};
