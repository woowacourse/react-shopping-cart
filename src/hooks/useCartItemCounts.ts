import { useRecoilValue } from "recoil";
import { selectedCartItemIdsState } from "../recoil/selectedCartItemIds";
import { cartItemsState } from "../recoil/cartItems";
import { calculateSelectedCartItemsCount } from "../utils/domain/calculateSelectedCartItemsCount";

interface UseSelectCartItemsCountReturn {
  selectedCartItemsCount: number;
  selectedUniqueCartItemsCount: number;
}

export const useSelectedCartItemCounts = (): UseSelectCartItemsCountReturn => {
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsState);
  const cartItems = useRecoilValue(cartItemsState);

  const selectedCartItemsCount = calculateSelectedCartItemsCount(cartItems);
  const selectedUniqueCartItemsCount = selectedCartItemIds.length;

  return { selectedCartItemsCount, selectedUniqueCartItemsCount };
};
