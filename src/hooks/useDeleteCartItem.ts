import { useState } from "react";
import cartItemsApi from "../apis/cartItems";
import { useCartItemContext } from "../contexts/CartItemContext";

export const useDeleteCartItem = () => {
  const { cartItems, setCartItems, selectedItem, handleSelectedItem } =
    useCartItemContext();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>("");

  const deleteCartItem = async (cartItemId: number) => {
    const previousCartItems = [...cartItems];
    const previousSelectedItems = new Set(selectedItem);

    const optimisticCartItems = cartItems.filter(
      (item) => item.id !== cartItemId
    );
    setCartItems(optimisticCartItems);

    const newSelectedItems = new Set(selectedItem);
    newSelectedItems.delete(cartItemId);
    handleSelectedItem(newSelectedItems);

    setIsDeleting(true);

    try {
      await cartItemsApi.delete(cartItemId);
      const updatedCartItems = await cartItemsApi.get();
      setCartItems(updatedCartItems);
      setDeleteError("");
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      setCartItems(previousCartItems);
      handleSelectedItem(previousSelectedItems);
      setDeleteError("장바구니 아이템을 삭제하는데 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteCartItem, isDeleting, deleteError };
};
