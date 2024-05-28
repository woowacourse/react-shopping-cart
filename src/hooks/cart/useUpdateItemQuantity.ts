import { useRecoilState } from "recoil";

import { cartItemQuantityState } from "@/recoil/cartItemQuantity";
import { patchCartItemQuantity } from "@/apis/cart";

const useUpdateItemQuantity = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityState(id));

  const increaseQuantity = async () => {
    const canUpdateCardItemQuantity = await patchCartItemQuantity(
      id,
      quantity + 1
    );

    if (canUpdateCardItemQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = async () => {
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
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useUpdateItemQuantity;
