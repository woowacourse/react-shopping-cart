import { ResponseCartItem, ResponseData } from "../types/types";
import { fetcher } from "./fetcher";

interface CarItemListParams {
  page?: number;
  size?: number;
  sort?: string;
}

async function getCartList({
  page = 0,
  size = 50,
  sort = "asc",
}: CarItemListParams): Promise<ResponseData<ResponseCartItem>> {
  return fetcher("/cart-items", {
    method: "GET",
    params: {
      page,
      size,
      sort,
    },
  });
}

export default getCartList;
