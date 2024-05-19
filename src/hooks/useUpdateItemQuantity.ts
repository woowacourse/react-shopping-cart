import { useRecoilState } from "recoil";

import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { patchCartItemQuantity } from "@/apis/cart";

const useUpdateItemQuantity = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantity(id));

  const handleIncreaseQuantity = async () => {
    const canUpdateCardItemQuantity = await patchCartItemQuantity(
      id,
      quantity + 1
    );

    if (canUpdateCardItemQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = async () => {
    const canUpdateCardItemQuantity = await patchCartItemQuantity(
      id,
      quantity - 1
    );

    if (canUpdateCardItemQuantity) {
      setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
    }
  };

  return {
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useUpdateItemQuantity;
