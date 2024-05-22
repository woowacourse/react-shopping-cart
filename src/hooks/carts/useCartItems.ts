import { useRecoilState } from "recoil";
import { deleteCartItem, patchCartItemQuantity } from "@/apis/cartItem";
import { cartItemsState } from "@/stores/cartItems";

const useCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const removeCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    return cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
  };

  const changeItemQuantity = async (itemId: number, quantity: number) => {
    try {
      await patchCartItemQuantity(itemId, quantity);
      setCartItems(updateItemQuantity(itemId, quantity));
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
    }
  };

  return { cartItems, removeCartItem, changeItemQuantity };
};

export default useCartItems;
