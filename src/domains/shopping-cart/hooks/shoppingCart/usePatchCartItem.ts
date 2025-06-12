import { useAsync } from "../../../../api/useAsync";
import { patchShoppingCart } from "../../api/shoppingCart";

export function usePatchCartItem() {
  const { run, loading } = useAsync(
    (id: string, quantity: number) => patchShoppingCart(id, quantity),
    "수량 변경에 실패했어요."
  );

  const patchCartItem = async (id: string, quantity: number) => {
    return await run(id, quantity);
  };

  return { patchCartItem, loading };
}
