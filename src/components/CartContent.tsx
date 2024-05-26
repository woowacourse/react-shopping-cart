import CartAmount from "./CartAmount";
import CartButton from "./CartButton";
import CartItemList from "./CartItemList";
import CartTitle from "./CartTitle";
import { cartItemsState } from "../recoil/cart/cartItems";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useFetchCartItems } from "../hooks/useFetchCartItems";

function CartContent() {
  useFetchCartItems();
  const cartItems = useRecoilValue(cartItemsState);

  const 내용물 =
    cartItems.length === 0 ? (
      <S.EmptyMessage>장바구니에 담은 상품이 없습니다.</S.EmptyMessage>
    ) : (
      <>
        <CartItemList cartItems={cartItems} />
        <CartAmount />
      </>
    );

  return (
    <>
      <S.Content>
        <CartTitle />
        {내용물}
      </S.Content>
      <CartButton />
    </>
  );
}

CartContent.Skeleton = () => {
  return (
    <S.Content>
      <CartTitle.Skeleton />
      <CartItemList.Skeleton />
      <CartAmount.Skeleton />
    </S.Content>
  );
};

export default CartContent;

const S = {
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
  Content: styled.div`
    padding: 36px 24px 100px 24px;
    min-height: 100vh;
  `,
};
