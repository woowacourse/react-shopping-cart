import useMutation from "./useMutation";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../constants/errorMessage";

interface UseQuantityControlProps {
  quantity: number;
  handleQuantity: (updateQuantity: (prev: number) => number) => void;
}

const useQuantityControl = ({
  quantity,
  handleQuantity,
}: UseQuantityControlProps) => {
  const { mutateData } = useMutation();

  const increaseQuantity = async (cartId: number) => {
    const newQuantity = quantity + 1;
    handleQuantity((prev) => prev + 1);

    await mutateData({
      apiCall: () => increaseCartItem(cartId, newQuantity),
      onSuccess: () => {},
      onError: () => {
        handleQuantity((prev) => prev - 1);
      },
    });
  };

  const decreaseQuantity = async (cartId: number) => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    handleQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    await mutateData({
      apiCall: () => decreaseCartItem(cartId, newQuantity),
      onSuccess: () => {},
      onError: () => {
        handleQuantity((prev) => prev + 1);
      },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await mutateData({
      apiCall: () => removeCartItem(cartId),
      onSuccess: () => {},
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
