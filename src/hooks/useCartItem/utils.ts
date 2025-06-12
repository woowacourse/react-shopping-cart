import { QUERY_KEY } from "@/constants";
import { getQueryData, setQueryData } from "@/modules/Query/QueryStore";
import { GetCartItemsResponse } from "@/types";

export function optimisticIncreaseCartItem(productId: number) {
  const prevCartItems = getQueryData(QUERY_KEY.cartItem) as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity + 1,
  };
  setQueryData(QUERY_KEY.cartItem, { ...prevCartItems, content: newCartContent });
}

export function optimisticDecreaseCartItem(productId: number) {
  const prevCartItems = getQueryData(QUERY_KEY.cartItem) as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity - 1,
  };
  setQueryData(QUERY_KEY.cartItem, { ...prevCartItems, content: newCartContent });
}

export function optimisticDeleteCartItem(cartItemId: number) {
  const prevCartItems = getQueryData(QUERY_KEY.cartItem) as GetCartItemsResponse;
  const newCartContent = prevCartItems.content.filter((item) => item.id !== cartItemId);
  setQueryData(QUERY_KEY.cartItem, { ...prevCartItems, content: newCartContent });
}
