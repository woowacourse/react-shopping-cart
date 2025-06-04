import { ResponseCartItem } from "../types/types";
import getCartItemList from "../api/cartItemListApi";
import { useDataFetch } from "./useDataFetch";

function useCart() {
  const fetcher = () =>
    getCartItemList({
      page: 0,
      size: 20,
      sort: "asc",
    });

  const { data, loading, error, refetch } = useDataFetch<ResponseCartItem[]>(
    fetcher,
    {
      autoFetch: true,
      deps: [],
    }
  );

  return {
    cartItemList: data || [],
    isLoading: loading,
    error,
    refetch,
  };
}

export default useCart;
