import { getCartItems, removeCartItem } from "@/apis/cart";
import { cartItemsState } from "@/recoil/cartItems";
import { useSetRecoilState } from "recoil";

const useCartItems = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const updateNewCartItems = () => {
    const fetchNewData = async () => {
      const newData = await getCartItems();
      setCartItems(newData);
    };
    fetchNewData();
  };

  const deleteCartItem = async (id: number) => {
    const canRemoveItem = await removeCartItem(id);

    if (canRemoveItem) {
      setCartItems((prevCartItems) => {
        return prevCartItems.filter((item) => item.id !== id);
      });
    }
  };

  return { updateNewCartItems, deleteCartItem };
};

export default useCartItems;
