import { useState } from "react";
import useMutation from "../common/useMutation";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "../../api/cartItem";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/errorMessage";

interface UseQuantityControlProps {
  initialQuantity: number;
  refetchCartItem: () => void;
}

const useQuantityControl = ({
  initialQuantity,
  refetchCartItem,
}: UseQuantityControlProps) => {
  const { mutateData } = useMutation();
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = async (cartId: number) => {
    setQuantity((prev) => prev + 1);

    await mutateData({
      apiCall: () => increaseCartItem(cartId, quantity + 1),
      onSuccess: refetchCartItem,
      onError: () => {
        setQuantity((prev) => prev - 1);
      },
    });
  };

  const decreaseQuantity = async (cartId: number) => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    await mutateData({
      apiCall: () => decreaseCartItem(cartId, quantity - 1),
      onSuccess: refetchCartItem,
      onError: () => {
        setQuantity((prev) => prev + 1);
      },
    });
  };

  const deleteCartItem = async (cartId: number) => {
    await mutateData({
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
    quantity,
  };
};

export default useQuantityControl;
