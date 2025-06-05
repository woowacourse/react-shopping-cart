import deleteCartItem from "@/apis/deleteCartItem";
import { ApiError } from "@/constants/ApiError";
import { useErrorToast } from "@/contexts/ErrorToastContext";
import { useCallback } from "react";

const useHandleDeleteCartItem = (refetchCartItems: () => Promise<void>) => {
  const { showError } = useErrorToast();

  const handleDeleteCartItem = useCallback(
    async (id: string) => {
      try {
        await deleteCartItem({ params: { id } });
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

  return { handleDeleteCartItem };
};

export default useHandleDeleteCartItem;
