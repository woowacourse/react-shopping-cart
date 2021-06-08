import { CUSTOMER_NAME } from '../../appConfig';
import { ERROR_MESSAGE } from '../../constants/error';
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

  const appSchema = (cartItemList: CartItemResponse[]) =>
    cartItemList.map((item) => {
      return {
        id: String(item.cart_id),
        price: item.price,
        name: item.name,
        image: item.image_url,
      };
    });

  return Promise.resolve(appSchema(cartItemList));
};

//post request
export const requestShoppingCartItemToAdd = async (productId: string): Promise<string> => {
  const APISchema = (productId: string) => ({
    product_id: Number(productId),
  });

  const {
    headers: { location },
  } = await customAxios.post(`/api/customers/${CUSTOMER_NAME}/carts`, APISchema(productId));

  const appSchema = (location: string) => location.match(/[0-9]+$/)?.[0] || null;

  const cartId = appSchema(location);

  if (!cartId) {
    throw new Error(ERROR_MESSAGE.INVALID_CART_ID_FROM_SERVER);
  }

  return Promise.resolve(cartId);
};

//delete request
export const requestShoppingCartItemToDelete = (cartItemId: string) =>
  customAxios.delete(`/api/customers/${CUSTOMER_NAME}/carts/${cartItemId}`);

//request util
export const requestShoppingCartItemsToDelete = (items: CartItem[]) => {
  Promise.all(items.map((item) => requestShoppingCartItemToDelete(item.id)));
};
