import styled from "styled-components";
import { cartItemsState } from "../../recoil/cartItems";
import { useRecoilValue } from "recoil";
import CartTitle from "./CartTitle";
import CartItemList from "./CartItemList";
import CartAmount from "./CartAmount";
import CartButton from "./CartButton";

export default function CartContent() {
  const cartItems = useRecoilValue(cartItemsState);

  const content =
    cartItems.length === 0 ? (
      <S.EmptyMessage>장바구니에 담은 상품이 없습니다.</S.EmptyMessage>
    ) : (
      <>
        <CartItemList cartItems={cartItems} />
        <CartAmount />
      </>
    );

  return (
    <S.Container>
      <CartTitle />
      {content}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    padding: 36px 24px 100px 24px;
    min-height: 100vh;
  `,

  EmptyMessage: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: rgba(10, 13, 19, 1);
    width: fit-content;
    margin: 0 auto;
  `,

  CartButton: styled(CartButton)`
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
