import PageTitle from "../components/common/PageTitle";
import styled from "styled-components";
import CartItemList from "../components/ShoppingCart/CartItemList/index";
import OrderSummary from "../components/ShoppingCart/OrderSummary";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCartItemsQuantityState, getCartItems, setCartPriceAndQuantitySelector } from "../recoil/selectors";
import FooterButton from "../components/common/FooterButton/index";
import CartEmptyScreen from "../components/ShoppingCart/CartEmptyScreen/index";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";
import Header from "../components/common/Header/index";
import { COLOR } from "../constants/styles";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const fetchedCartItems = useRecoilValue(getCartItems);
  const [cartItems, setCartItems] = useState(fetchedCartItems);
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);
  const setCartPrice = useSetRecoilState(setCartPriceAndQuantitySelector);

  useEffect(() => {
    setCartPrice(fetchedCartItems);
  }, [fetchedCartItems, setCartPrice]);

  const router = useNavigate();

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  const cartItemsLength = cartItems.length;
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
