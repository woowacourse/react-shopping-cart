import { useSetRecoilState } from "recoil";
import { deleteCartItem } from "../api";
import { ERROR_MESSAGES } from "../constants";
import { cartItemsState } from "../recoil/atoms/atoms";

export const useDeleteCartItem = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_CART_ITEM, error);
    }
  };

  return handleItemDelete;
};
