import { useState } from "react";

import { useRecoilState } from "recoil";
import { cartItemQuantity } from "@/recoil/cartItemQuantity";

import { patchCartItemQuantity } from "@/apis";

const useUpdateItemQuantity = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(id));
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleIncreaseQuantity = async () => {
    try {
      setQuantity((prevQuantity) => prevQuantity + 1);

      setIsUpdateLoading(true);
      await patchCartItemQuantity(id, quantity + 1);
      setIsUpdateLoading(false);
    } catch (error) {
      setIsUpdateLoading(false);
      setQuantity((prevQuantity) => prevQuantity - 1);

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity === 1) return;

    try {
      setQuantity((prevQuantity) => prevQuantity - 1);

      setIsUpdateLoading(true);
      await patchCartItemQuantity(id, quantity - 1);
      setIsUpdateLoading(false);
    } catch (error) {
      setIsUpdateLoading(false);
      setQuantity((prevQuantity) => prevQuantity + 1);

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return {
    isUpdateLoading,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useUpdateItemQuantity;
