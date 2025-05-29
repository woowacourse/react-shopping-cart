import { emptyLayout, emptyText } from "./EmptyShoppingCart.style";

export function EmptyShoppingCart() {
  return (
    <div css={emptyLayout}>
      <p css={emptyText}>장바구니에 담은 상품이 없습니다.</p>
    </div>
  );
}
