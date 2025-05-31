import { useState, useCallback } from "react";
import { useErrorToast } from "../contexts/ErrorToastContext";
import updateCartItemQuantity from "../apis/updateCartItemQuantity";
import { ApiError } from "../constants/ApiError";

const useHandleCartItemQuantity = (refetchCartItems: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorToast();

  const handleCartItemQuantity = useCallback(
    async (params: { id: string; quantity: number }) => {
      setIsLoading(true);
      try {
        await updateCartItemQuantity({ params });
      } catch (error) {
        if (error instanceof ApiError) {
          showError(error);
          setIsLoading(false);
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
      setIsLoading(false);
    },
    [refetchCartItems, showError]
  );

  return { isLoading, handleCartItemQuantity };
};

export default useHandleCartItemQuantity;
