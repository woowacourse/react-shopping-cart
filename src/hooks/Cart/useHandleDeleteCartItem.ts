import deleteCartItem from "@/apis/deleteCartItem";
import { ApiError } from "@/constants/ApiError";
import { useErrorToast } from "@/contexts/ErrorToastContext";
import { useState, useCallback } from "react";

const useHandleDeleteCartItem = (refetchCartItems: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorToast();

  const handleDeleteCartItem = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await deleteCartItem({ params: { id } });
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

  return { isLoading, handleDeleteCartItem };
};

export default useHandleDeleteCartItem;
