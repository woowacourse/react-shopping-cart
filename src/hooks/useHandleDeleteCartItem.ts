import { useState, useCallback } from "react";
import { useErrorToast } from "../contexts/ErrorToastContext";
import { ApiError } from "../constants/ApiError";
import deleteCartItem from "../apis/deleteCartItem";

const useHandleDeleteCartItem = (refetchCartItems: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useErrorToast();

  const handleDeleteCartItem = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        await deleteCartItem(id);
      } catch (error) {
        if (error instanceof ApiError) {
          showError(error);
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
