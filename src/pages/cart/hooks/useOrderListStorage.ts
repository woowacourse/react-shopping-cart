import { orderListStorageController } from "@/domains/controller/orderListStorageController";
import { useCallback, useEffect } from "react";

export const useOrderListStorage = (initialOrderIds: number[]) => {
  useEffect(() => {
    orderListStorageController.set([...initialOrderIds]);
  }, [initialOrderIds]);

  const setOrderListStorage = useCallback((orderIds: number[]) => {
    orderListStorageController.set([...orderIds]);
  }, []);

  const clearOrderListStorage = useCallback(() => {
    orderListStorageController.clear();
  }, []);

  const addOrderListStorage = useCallback((id: number) => {
    orderListStorageController.set((prev) => [...prev, id]);
  }, []);

  const removeOrderListStorage = useCallback((id: number) => {
    orderListStorageController.set((prev) =>
      prev.filter((itemId) => itemId !== id)
    );
  }, []);

  return {
    setOrderListStorage,
    clearOrderListStorage,
    addOrderListStorage,
    removeOrderListStorage,
  };
};
