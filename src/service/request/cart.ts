import axios from 'axios';
import { CUSTOMER_NAME } from '../../constants/API';
import { ItemInCart, ItemInCartResponse } from '../../types';

export const requestShoppingCartItemList = async (): Promise<ItemInCart[]> => {
  const { data: cartItemList } = await axios.get<ItemInCartResponse[]>(
    `/api/customers/${CUSTOMER_NAME}/carts`
  );

  //TODO: localStorage에서 수량, 체크 들고오기
  const processedCartItemList: ItemInCart[] = cartItemList.map((item) => ({
    id: item.cart_id,
    price: item.price,
    name: item.name,
    image: item.image_url,
    quantity: 1,
    checked: false,
  }));

  return Promise.resolve(processedCartItemList);
};

export const requestShoppingCartItemToAdd = (item: ItemInCart) =>
  axios.post(`/api/customers/${CUSTOMER_NAME}/carts`, {
    product_id: item.id,
  });

//TODO: 이거 localstorage로 처리하기
export const requestShoppingCartItemToChange = (item: ItemInCart) =>
  axios.put<ItemInCart>(`/cart/${item.id}`, item);

export const requestShoppingCartItemToDelete = (itemId: string) =>
  axios.delete(`/api/customers/${CUSTOMER_NAME}/carts/${itemId}`);

//TODO: 이거 localstorage로 처리하기
export const requestAllShoppingCartItemToBeChecked = (items: ItemInCart[], checked: boolean) => {
  Promise.all(
    items.map((item) => axios.put<ItemInCart>(`/cart/${item.id}`, { ...item, checked }))
  );
};

export const requestShoppingCartItemsToDelete = (items: ItemInCart[]) => {
  Promise.all(items.map((item) => requestShoppingCartItemToDelete(item.id)));
};

export const requestShoppingCartItemsToClear = async () => {
  const items = await requestShoppingCartItemList();

  return Promise.all(items.map((item) => requestShoppingCartItemToDelete(item.id)));
};
