import { useState } from "react";
import cartItemsApi from "../apis/cartItems";
import { useCartItemContext } from "../contexts/CartItemContext";

export const useUpdateCartItem = () => {
  const { cartItems, setCartItems } = useCartItemContext();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");

  const updateCartItem = async (cartItemId: number, quantity: number) => {
    if (quantity <= 0) return;

    const previousCartItems = [...cartItems];

    const optimisticCartItems = cartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity: quantity } : item
    );
    setCartItems(optimisticCartItems);

    setIsUpdating(true);

    try {
      await cartItemsApi.patch(cartItemId, quantity);
      const updatedCartItems = await cartItemsApi.get();
      setCartItems(updatedCartItems);
      setUpdateError("");
    } catch (error) {
      console.error("Failed to update cart item:", error);
      setCartItems(previousCartItems);
      setUpdateError("장바구니 아이템을 업데이트하는데 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateCartItem, isUpdating, updateError };
};
