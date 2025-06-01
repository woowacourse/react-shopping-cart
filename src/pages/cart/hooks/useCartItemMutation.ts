import { deleteCartItem } from "@/apis/cartItems/deleteCartItem";
import { updateCartItemQuantity } from "@/apis/cartItems/updateCartItemQuantity";
import useMutation from "@/shared/hooks/useMutation";
import { useCallback } from "react";

type useCartItemMutationParams = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const useCartItemMutation = ({
  onSuccess,
  onError,
}: useCartItemMutationParams) => {
  const { mutate: removeCartItemMutate } = useMutation(deleteCartItem);
  const { mutate: updateCartItemMutate } = useMutation(updateCartItemQuantity);

  const updateCartItem = useCallback(
    async (id: number, quantity: number) => {
      await updateCartItemMutate(
        {
          id,
          quantity,
        },
        {
          onSuccess,
          onError,
        }
      );
    },
    [updateCartItemMutate, onSuccess, onError]
  );

  const removeCartItem = useCallback(
    async (id: number) => {
      await removeCartItemMutate(id, {
        onSuccess,
        onError,
      });
    },
    [removeCartItemMutate, onSuccess, onError]
  );

  return {
    updateCartItem,
    removeCartItem,
  };
};

export default useCartItemMutation;
