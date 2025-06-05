import { useMutation } from "@/modules/Query";
import { CartItemApi, PostCartItemsParams } from "@/apis";
import { useError } from "@/context";

export default function useCartItemPostMutation() {
  const { showError } = useError();

  return useMutation<PostCartItemsParams, void>({
    mutationFn: CartItemApi.postCartItems,
    onError: () => showError({ type: "server", message: "재고가 부족합니다." }),
  });
}
