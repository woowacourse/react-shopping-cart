import { apiGet } from "./apiRequest";

type fetchCartItemsParams = {
  params?: {
    page: string;
    size: string;
  };
  signal?: AbortSignal;
};

const fetchCartItems = async ({
  params = { page: "0", size: "50" },
  signal,
}: fetchCartItemsParams) => {
  return apiGet("/cart-items", params, { signal });
};

export default fetchCartItems;
