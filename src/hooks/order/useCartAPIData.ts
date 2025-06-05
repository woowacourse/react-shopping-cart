import { getShoppingCartData } from "../../api/cart";
import { useAPIDataContext } from "../../context/APIDataProvider";

export function useCartAPIData() {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });

  return {
    cartListData,
    cartRefetch,
  };
}
