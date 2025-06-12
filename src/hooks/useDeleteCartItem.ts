import { useState } from "react";
import cartItemsApi from "../apis/cartItems";
import { useCartItemContext } from "../contexts/CartItemContext";

export const useDeleteCartItem = () => {
  const {
    cartItems,
    setCartItems,
    selectedItems,
    removeSelectedItem,
    addSelectedItem,
  } = useCartItemContext();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>("");

  const deleteCartItem = async (cartItemId: number) => {
    const previousCartItems = [...cartItems];
    const wasSelectedBefore = selectedItems.has(cartItemId);

    const optimisticCartItems = cartItems.filter(
      (item) => item.id !== cartItemId
    );
    setCartItems(optimisticCartItems);

    if (wasSelectedBefore) {
      removeSelectedItem(cartItemId);
    }

    setIsDeleting(true);

    try {
      await cartItemsApi.delete(cartItemId);
      const updatedCartItems = await cartItemsApi.get();
      setCartItems(updatedCartItems);
      setDeleteError("");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      setCartItems(previousCartItems);
      if (wasSelectedBefore) {
        addSelectedItem(cartItemId);
      }
      setDeleteError("장바구니 아이템을 삭제하는데 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteCartItem, isDeleting, deleteError };
};
