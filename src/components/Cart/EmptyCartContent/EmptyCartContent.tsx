import * as Styled from "./EmptyCartContent.style";

export function EmptyCartContent() {
  return (
    <>
      <Styled.EmptyCartMessage>
        장바구니에 담긴 상품이 없습니다.
      </Styled.EmptyCartMessage>
      <Styled.OrderConfirmButton
        disabled={true}
        type="button"
        aria-label="주문 확인 버튼 비활성화 상태"
      >
        주문 확인
      </Styled.OrderConfirmButton>
    </>
  );
}
