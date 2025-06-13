import { useCallback } from "react";
import useLocalStorage from "../useLocalStorage";

const SELECTED_CART_IDS_KEY = "selectedCartIds";

const useSelectedCartIdsLocalStorage = () => {
  const { setItemToLocalStorage, getItemFromLocalStorage } = useLocalStorage();

  const setSelectedCartIdsToLocalStorage = useCallback(
    (selectedCartIds: number[]) => {
      setItemToLocalStorage<number[]>(SELECTED_CART_IDS_KEY, selectedCartIds);
    },
    [setItemToLocalStorage]
  );

  const getSelectedCartIdsFromLocalStorage = useCallback(():
    | number[]
    | null => {
    const selectedCartIds = getItemFromLocalStorage<number[]>(
      SELECTED_CART_IDS_KEY
    );
    return selectedCartIds;
  }, [getItemFromLocalStorage]);

  return {
    setSelectedCartIdsToLocalStorage,
    getSelectedCartIdsFromLocalStorage,
  };
};

export default useSelectedCartIdsLocalStorage;
