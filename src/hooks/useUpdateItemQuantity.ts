import { useState } from "react";

import { useRecoilState } from "recoil";
import { cartItemQuantity } from "@/recoil/cartItemQuantity";

import { patchCartItemQuantity } from "@/apis";

const useUpdateItemQuantity = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(id));
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleIncreaseQuantity = async () => {
    setIsUpdateLoading(true);

    const canUpdateCardItemQuantity = await patchCartItemQuantity(
      id,
      quantity + 1
    );

    setIsUpdateLoading(false);
    if (canUpdateCardItemQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity === 1) return;

    setIsUpdateLoading(true);

    const canUpdateCardItemQuantity = await patchCartItemQuantity(
      id,
      quantity - 1
    );

    setIsUpdateLoading(false);
    if (canUpdateCardItemQuantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
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
