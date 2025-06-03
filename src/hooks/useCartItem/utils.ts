import { getQueryData, setQueryData } from "@/modules/Query/QueryStore";
import { GetCartItemsResponse } from "@/types";

export function optimisticIncreaseCartItem(productId: number) {
  const prevCartItems = getQueryData("cartItems") as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity + 1,
  };
  setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}

export function optimisticDecreaseCartItem(productId: number) {
  const prevCartItems = getQueryData("cartItems") as GetCartItemsResponse;
  const currentCartItemIndex = prevCartItems.content.findIndex((item) => item.product.id === productId);
  const newCartContent = [...prevCartItems.content];
  newCartContent[currentCartItemIndex] = {
    ...newCartContent[currentCartItemIndex],
    quantity: newCartContent[currentCartItemIndex].quantity - 1,
  };
  setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}

export function optimisticDeleteCartItem(cartItemId: number) {
  const prevCartItems = getQueryData("cartItems") as GetCartItemsResponse;
  const newCartContent = prevCartItems.content.filter((item) => item.id !== cartItemId);
  setQueryData("cartItems", { ...prevCartItems, content: newCartContent });
}
