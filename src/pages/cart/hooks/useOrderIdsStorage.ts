import { orderIdsStorageController } from "@/domains/controller/orderIdsStorageController";
import { useCallback, useEffect } from "react";

export const useOrderIdsStorage = (initialOrderIds: number[]) => {
  useEffect(() => {
    orderIdsStorageController.set([...initialOrderIds]);
  }, [initialOrderIds]);

  const setOrderIdsStorage = useCallback((orderIds: number[]) => {
    orderIdsStorageController.set([...orderIds]);
  }, []);

  const clearOrderIdsStorage = useCallback(() => {
    orderIdsStorageController.clear();
  }, []);

  const addOrderIdStorage = useCallback((id: number) => {
    orderIdsStorageController.set((prev) => [...prev, id]);
  }, []);

  const removeOrderIdStorage = useCallback((id: number) => {
    orderIdsStorageController.set((prev) =>
      prev.filter((itemId) => itemId !== id)
    );
  }, []);

  return {
    setOrderIdsStorage,
    clearOrderIdsStorage,
    addOrderIdStorage,
    removeOrderIdStorage,
  };
};
