import * as S from './EmptyCartContainer.styled';

export default function EmptyCartContainer() {
  return (
    <S.Container>
      장바구니에 담은 상품이 없습니다.
      <S.PayConfirmButton type="button">주문 확인</S.PayConfirmButton>
    </S.Container>
  );
}
