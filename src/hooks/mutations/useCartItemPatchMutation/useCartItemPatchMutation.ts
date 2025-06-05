import { CartItemApi, PatchCartItemsParams } from "@/apis";
import { useMutation } from "@/modules/Query";

export default function useCartItemPatchMutation() {
  return useMutation<PatchCartItemsParams, void>({
    mutationFn: CartItemApi.patchCartItems,
  });
}
