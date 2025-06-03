import { useState } from "react";
import cartItemsApi from "../apis/cartItems";
import { useCartItemContext } from "../contexts/useCartItemContext";

export const useUpdateCartItem = () => {
  const { setCartItems } = useCartItemContext();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");

  const updateCartItem = async (cartItemId: number, quantity: number) => {
    setIsUpdating(true);
    try {
      await cartItemsApi.patch(cartItemId, quantity);
      const updatedCartItems = await cartItemsApi.get();
      setCartItems(updatedCartItems);
      setUpdateError("");
    } catch (error) {
      console.error("Failed to update cart item:", error);
      setUpdateError("장바구니 아이템을 업데이트하는데 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateCartItem, isUpdating, updateError };
};
