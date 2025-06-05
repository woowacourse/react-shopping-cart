import { CartItemApi } from "@/apis";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules/Query";

export default function useCartItemQuery() {
  return useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: QUERY_KEY.cartItem,
    initialData: { content: [] },
  });
}
