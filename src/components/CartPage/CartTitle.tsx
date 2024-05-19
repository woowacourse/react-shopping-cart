import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { rawCartItemsState } from "../../recoil/rawCartItems";

export default function CartTitle() {
  const cartItems = useRecoilValue(rawCartItemsState);
  const cartItemCount = cartItems.length;

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {!!cartItemCount && <S.Info>현재 {cartItemCount}종류의 상품이 담겨있습니다.</S.Info>}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  Title: styled.div`
    font-size: 24px;
    line-height: 34.75px;
    font-weight: 700;
  `,

  Info: styled.div`
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: rgba(10, 13, 19, 1);
  `,
};
