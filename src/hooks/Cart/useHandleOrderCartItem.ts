import orderCartItem from "@/apis/orderCartItem";
import { ApiError } from "@/constants/ApiError";
import { useErrorToast } from "@/contexts/ErrorToastContext";
import { CartItem } from "@/type/CartItem";
import { useCallback } from "react";

const useHandleOrderCartItem = (refetchCartItems: () => Promise<void>) => {
  const { showError } = useErrorToast();

  const handleOrderCartItem = useCallback(
    async (CartItems: CartItem[]) => {
      try {
        await orderCartItem({ cartItems: CartItems });
      } catch (error) {
        if (error instanceof ApiError) {
          showError(error);
        }
      }
      try {
        await refetchCartItems();
        return;
      } catch (error) {
        if (error instanceof ApiError) {
          showError(error);
        }
      }
    },
    [refetchCartItems, showError]
  );

  return { handleOrderCartItem };
};

export default useHandleOrderCartItem;
