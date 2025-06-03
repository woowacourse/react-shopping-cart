import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../constants/errorMessage";
import { CartItemType } from "../types/response";
import { findCartItemById } from "../utils/cartItem";
import useFetch from "./useFetch";

interface UseQuantityControlProps {
  cartItems: CartItemType[];
  updateCartItem: (cartId: number, newItem: CartItemType) => void;
  refetchCartItem: () => void;
}

const useQuantityControl = ({
  cartItems,
  updateCartItem,
  refetchCartItem,
}: UseQuantityControlProps) => {
  const { fetchData } = useFetch<void>("cartItems");

  const updateQuantity = (cartId: number, quantity: number) => {
    const { product } = findCartItemById(cartId, cartItems);
    const newCartItem = { id: cartId, product, quantity };
    updateCartItem(cartId, newCartItem);
  };

  const increaseQuantity = async (cartId: number) => {
    const { quantity } = findCartItemById(cartId, cartItems);
    const newQuantity = quantity + 1;
    updateQuantity(cartId, newQuantity);

    await fetchData({
      apiCall: () => increaseCartItem(cartId, newQuantity),
      onSuccess: refetchCartItem,
      onError: () => {
        updateQuantity(cartId, quantity);
      },
    });
  };

  // 안돌아간다면 이 quantity 객체 분해가 문제 1순위임
  const decreaseQuantity = async (cartId: number) => {
    const { quantity } = findCartItemById(cartId, cartItems);
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    updateQuantity(cartId, newQuantity);

    await fetchData({
      apiCall: () => decreaseCartItem(cartId, newQuantity),
      onSuccess: refetchCartItem,
      onError: () => {
        updateQuantity(cartId, quantity);
      },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await fetchData({
      apiCall: () => removeCartItem(cartId),
      onSuccess: refetchCartItem,
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        alert(errorMessage);
      },
    });
  };

  return {
    increaseQuantity,
    decreaseQuantity,
    deleteCartItem,
  };
};

export default useQuantityControl;
