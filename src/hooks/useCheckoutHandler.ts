import { useRecoilState } from "recoil";
import { useNavigateWithQuery } from "./useNavigateWithQuery";
import { selectedCartItemIdsState } from "../recoil/selectedCartItemIds";
import { useSelectedCartItemCount } from "./useSelectedCartItemCount";
import { useRefreshCartItems } from "./useRefreshCartItems";
import { ROUTE_PATH } from "../constants/routePath";
import { createOrder } from "../api/orders";

interface useCheckoutHandlerReturn {
  handleCheckout: (totalPayAmount: number) => void;
}

export const useCheckoutHandler = (): useCheckoutHandlerReturn => {
  const { navigateWithQuery } = useNavigateWithQuery();
  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedCartItemIdsState);
  const { selectedCartItemCount, selectedUniqueCartItemCount } = useSelectedCartItemCount();
  const { refreshCartItems } = useRefreshCartItems();

  const resetCartItemSelection = () => setSelectedCartItemIds([]);

  const routeToCheckout = (totalPayAmount: number) => {
    navigateWithQuery(ROUTE_PATH.checkout, {
      boughtItemCount: selectedCartItemCount.toString(),
      uniqueBoughtItemCount: selectedUniqueCartItemCount.toString(),
      totalPayAmount: totalPayAmount.toString(),
    });
  };

  const handleCheckout = async (totalPayAmount: number) => {
    await createOrder(selectedCartItemIds);
    refreshCartItems();
    resetCartItemSelection();
    routeToCheckout(totalPayAmount);
  };

  return { handleCheckout };
};
