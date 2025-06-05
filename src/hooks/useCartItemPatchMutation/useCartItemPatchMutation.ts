import { useMutation } from "@/modules/Query";
import { CartItemApi, PatchCartItemsParams } from "@/apis";
import { useError } from "@/context";

export default function useCartItemPatchMutation() {
  const { showError } = useError();

  return useMutation<PatchCartItemsParams, void>({
    mutationFn: CartItemApi.patchCartItems,
    // onMutate: () => optimisticIncreaseCartItem(productId),
    // onError: () => {
    //   refetchCartItems();
    //   showError({ type: "server", message: "재고가 부족합니다." });
    // },
  });
}
