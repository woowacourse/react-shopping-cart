import { addCartItem } from "src/api/cartItem";

const useDefaultCartItem = () => {
  return {
    add: () => {
      addCartItem(10);
      addCartItem(11);
      addCartItem(12);
      addCartItem(21);
      addCartItem(34);
    },
  };
};

export default useDefaultCartItem;
