import { deleteCartItem } from "@/apis/cartItems/deleteCartItem";
import { updateCartItemQuantity } from "@/apis/cartItems/updateCartItemQuantity";
import useMutation from "@/shared/hooks/useMutation";
import { useCallback } from "react";

const useCartItemMutation = (refetchCartItems: () => Promise<void>) => {
  const { mutate: removeCartItemMutate } = useMutation(deleteCartItem);
  const { mutate: updateCartItemMutate } = useMutation(updateCartItemQuantity);

  const updateCartItem = useCallback(
    async (id: number, quantity: number) => {
      await updateCartItemMutate({
        id,
        quantity,
      });
      refetchCartItems();
    },
    [refetchCartItems, updateCartItemMutate]
  );

  const removeCartItem = useCallback(
    async (id: number) => {
      await removeCartItemMutate(id);
      refetchCartItems();
    },
    [refetchCartItems, removeCartItemMutate]
  );

  return {
    updateCartItem,
    removeCartItem,
  };
};

export default useCartItemMutation;
