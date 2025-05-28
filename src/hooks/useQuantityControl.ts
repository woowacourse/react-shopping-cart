import { useState } from "react";
import useMutation from "./useMutation";
import { decreaseCartItems, increaseCartItems } from "../api/cartItem";

interface UseQuantityControlProps {
  initialQuantity: number;
}

const useQuantityControl = ({ initialQuantity }: UseQuantityControlProps) => {
  const { mutateData } = useMutation();
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = async (cartId: number) => {
    setQuantity((prev) => prev + 1);

    await mutateData({
      apiCall: () => increaseCartItems(cartId, quantity),
      onSuccess: () => {},
      onError: () => {
        setQuantity((prev) => prev - 1);
      },
    });
  };

  const decreaseQuantity = async (cartId: number) => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    await mutateData({
      apiCall: () => decreaseCartItems(cartId, quantity),
      onSuccess: () => {},
      onError: () => {
        setQuantity((prev) => prev + 1);
      },
    });
  };

  return {
    increaseQuantity,
    decreaseQuantity,
    quantity,
  };
};

export default useQuantityControl;
