import { useState } from "react";
import cartItemsApi from "../apis/cartItems";
import { useCartItemContext } from "../contexts/useCartItemContext";

export const useDeleteCartItem = () => {
  const { setCartItems } = useCartItemContext();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>("");

  const deleteCartItem = async (cartItemId: number) => {
    setIsDeleting(true);

    try {
      await cartItemsApi.delete(cartItemId);
      const updatedCartItems = await cartItemsApi.get();
      setCartItems(updatedCartItems);
      setDeleteError("");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      setDeleteError("장바구니 아이템을 삭제하는데 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };
  return { deleteCartItem, isDeleting, deleteError };
};
