import type { CartItem, ResponseCartItem } from '../../types/cartItem.type';
import { ResponseCartItemList } from '../../types/cartItemList.type';
import { requestDelete, requestGet, requestPatch } from '../fetcher';
import { BASE_URL_LIST } from '../baseUrlList';
import { ENDPOINT_LIST } from '../endpointList';

const PreprocessCartItemList = (arr: ResponseCartItem[]): CartItem[] => {
  return arr.map(({ id, quantity, product }) => ({
    quantity,
    product: product,
    cartItemId: id,
  }));
};

export const requestCartItemList = async (): Promise<CartItem[]> => {
  const data = await requestGet<ResponseCartItemList>({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ENDPOINT_LIST.CART_LIST,
  });

  return PreprocessCartItemList(data.content);
};

export const requestSetCartItemQuantity = async (cartItemId: number, quantity: number) => {
  await requestPatch({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ENDPOINT_LIST.CART_ITEM(cartItemId),
    body: { quantity },
  });
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  await requestDelete({
    baseUrl: BASE_URL_LIST.CART,
    endpoint: ENDPOINT_LIST.CART_ITEM(cartItemId),
    body: { id: cartItemId },
  });
};
