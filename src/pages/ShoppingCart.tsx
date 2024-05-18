import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import CartItemList from "../components/CartItemList/index";
import OrderSummary from "../components/OrderSummary";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCartItemsQuantityState, getCartItems, setCartPriceSelector } from "../recoil/selectors";
import FooterButton from "../components/FooterButton/index";
import CartEmptyScreen from "../components/CartEmptyScreen/index";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";
import Header from "../components/Header/index";
import { COLOR } from "../constants/styles";
import { useState } from "react";

const ShoppingCart = () => {
  const fetchedCartItems = useRecoilValue(getCartItems);
  const [cartItems, setCartItems] = useState(fetchedCartItems);

  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);
  const setCartPrice = useSetRecoilState(setCartPriceSelector);
  const router = useNavigate();

  setCartPrice(cartItems);

  const cartItemsLength = cartItems.length;

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  const isCartEmpty = cartItemsLength === 0;

  const subTitle = isCartEmpty
    ? "장바구니에 상품을 추가해주세요"
    : `현재 ${cartItemsLength}종류의 상품이 담겨있습니다.`;

  return (
    <>
      <Header type="logo" />
      <PageContainer>
        <PageTitle title="장바구니" subTitle={subTitle} />
        {isCartEmpty ? (
          <CartEmptyScreen />
        ) : (
          <>
            <CartItemList cartItems={cartItems} removeCartItem={removeCartItem} />
            <OrderSummary />
          </>
        )}
        <FooterButton
          disabled={checkedCartItemsQuantity === 0}
          buttonText="주문 확인"
          onClick={() => router(PAGE_URL.CheckOrder)}
        />
      </PageContainer>
    </>
  );
};

export default ShoppingCart;

const PageContainer = styled.div`
  padding: 36px 25px 104px 36px;
  background-color: ${COLOR.white};
`;
