import { ResponseCartItem } from "../types/order";
import { fetcher } from "./fetcher";
interface CarItemListProps {
  page?: number;
  size?: number;
  sort?: string;
}

async function getCartItemList({
  page = 0,
  size = 50,
  sort = "asc",
}: CarItemListProps): Promise<ResponseCartItem[]> {
  return fetcher("/cart-items", {
    method: "GET",
    params: {
      page,
      size,
      sort,
    },
  });
}

export default getCartItemList;
