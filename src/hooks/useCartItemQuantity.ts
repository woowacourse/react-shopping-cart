import { useRecoilState } from "recoil";
import { cartItemQuantityStates } from "../recoil/atoms";
import { patchCartItemQuantity } from "../api/cartItem";

const useCartItemQuantity = (itemNumber: number) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityStates(itemNumber));

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    patchCartItemQuantity(itemNumber, quantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => prev - 1);
    patchCartItemQuantity(itemNumber, quantity - 1);
  };

  return { quantity, handleIncrease, handleDecrease };
};

export default useCartItemQuantity;
