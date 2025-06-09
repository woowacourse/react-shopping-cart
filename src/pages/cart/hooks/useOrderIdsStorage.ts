import { orderIdsStorageController } from "@/domains/controller/orderIdsStorageController";
import { useCallback } from "react";

export const useOrderIdsStorage = () => {
  const getOrderIdsStorage = useCallback(() => {
    return orderIdsStorageController.get();
  }, []);

  const setOrderIdsStorage = useCallback((orderIds: number[]) => {
    orderIdsStorageController.set([...orderIds]);
  }, []);

  return {
    getOrderIdsStorage,
    setOrderIdsStorage,
  };
};
