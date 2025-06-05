import { CartItemApi, DeleteCartItemsParams } from "@/apis";
import { useError } from "@/context";
import { useMutation } from "@/modules/Query";

export default function useCartItemDeleteMutation() {
  const { showError } = useError();

  return useMutation<DeleteCartItemsParams, void>({
    mutationFn: CartItemApi.deleteCartItems,
    // onMutate: () => optimisticIncreaseCartItem(productId),
    // onError: () => {
    //   refetchCartItems();
    //   showError({ type: "server", message: "재고가 부족합니다." });
    // },
  });
}
