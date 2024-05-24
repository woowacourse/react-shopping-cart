import { rawCartItemsState } from "../recoil/cart/rawCartItems";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

function CartTitle() {
  const cartItemCount = useRecoilValue(rawCartItemsState).length;

  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      {!!cartItemCount && (
        <S.Info>현재 {cartItemCount}종류의 상품이 담겨있습니다.</S.Info>
      )}
    </S.Container>
  );
}

CartTitle.Skeleton = () => {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.InfoSkeleton />
    </S.Container>
  );
};

export default CartTitle;

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

  InfoSkeleton: styled.div`
    width: 200px;
    height: 15px;
    background-color: #e0e0e0;
    border-radius: 4px;
  `,
};
