import { useCallback } from "react";
import { useErrorToast } from "../../contexts/ErrorToastContext";
import updateCartItemQuantity from "../../apis/updateCartItemQuantity";
import { ApiError } from "../../constants/ApiError";

const useHandleCartItemQuantity = (refetchCartItems: () => Promise<void>) => {
  const { showError } = useErrorToast();

  const handleCartItemQuantity = useCallback(
    async (params: { id: string; quantity: number }) => {
      try {
        await updateCartItemQuantity({ params });
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

  return { handleCartItemQuantity };
};

export default useHandleCartItemQuantity;
