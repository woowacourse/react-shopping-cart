import { useAsync } from "../../../../api/useAsync";
import { deleteShoppingCart } from "../../api/shoppingCart";

export function useDeleteCartItem() {
  const { run, loading } = useAsync(
    (id) => deleteShoppingCart(id),
    "장바구니 데이터 삭제에 실패했습니다"
  );

  const deleteCartItem = async (id: string) => {
    return await run(id);
  };

  return { deleteCartItem, loading };
}
