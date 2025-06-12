import { CartItemApi, DeleteCartItemsParams } from "@/apis";
import { useMutation } from "@/modules/Query";

export default function useCartItemDeleteMutation() {
  return useMutation<DeleteCartItemsParams, void>({
    mutationFn: CartItemApi.deleteCartItems,
  });
}
