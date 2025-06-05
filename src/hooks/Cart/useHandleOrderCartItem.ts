import orderCartItem from "@/apis/orderCartItem";
import { ApiError } from "@/constants/ApiError";
import { useErrorToast } from "@/contexts/ErrorToastContext";
import { CartItem } from "@/type/CartItem";
import { useCallback } from "react";

// 구현은 완료 했으나, 실제도 문제 없는 동작을 위해서는 기존 Product Page가 필요합니다.
// 현재는 Product Page가 없기 때문에, 동작할때 문제가 발생할 수 있습니다.
const useHandleOrderCartItem = (refetchCartItems: () => Promise<void>) => {
  const { showError } = useErrorToast();

  const handleOrderCartItem = useCallback(
    async (CartItems: CartItem[]) => {
      try {
        await orderCartItem({ cartItems: CartItems });
      } catch (error) {
        if (error instanceof ApiError) {
          showError(error);
          return;
        }
      }
      try {
        await refetchCartItems();
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
