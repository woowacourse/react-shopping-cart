import { FetchCartItemsResult } from "../type/CartItem";
import { apiClient } from "./apiClient";

type fetchCartItemsParams = {
  params?: {
    page: string;
    size: string;
  };
};

const fetchCartItems = async ({
  params = { page: "0", size: "50" },
}: fetchCartItemsParams) => {
  const data = await apiClient.get<FetchCartItemsResult>({
    endpoint: "/cart-items",
    searchParams: params,
    useToken: true,
  });

  return data;
};

export default fetchCartItems;
