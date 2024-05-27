import { getCartItems } from "@/auth/apis/cart";
import { cartItemsState } from "@/recoil/cartItems";
import { useSetRecoilState } from "recoil";

const useUpdateCartItems = () => {
  const setCartItems = useSetRecoilState(cartItemsState);

  const updateNewCartItems = () => {
    const fetchNewData = async () => {
      const newData = await getCartItems();
      setCartItems(newData);
    };
    fetchNewData();
  };

  return { updateNewCartItems };
};

export default useUpdateCartItems;
