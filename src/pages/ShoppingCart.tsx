import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import CartItemList from "../components/CartItemList/index";
import OrderSummary from "../components/OrderSummary";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsLengthState, checkedCartItemsQuantityState, setCartPriceSelector } from "../recoil/selectors";
import FooterButton from "../components/FooterButton/index";
import CartEmptyScreen from "../components/CartEmptyScreen/index";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";
import { useEffect } from "react";
import { fetchCartItems } from "../api/cartItem";
import { cartItemsState } from "../recoil/atoms";
import Header from "../components/Header/index";

const ShoppingCart = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const cartItemsLength = useRecoilValue(cartItemsLengthState);
  const setCartPrice = useSetRecoilState(setCartPriceSelector);
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);
  const router = useNavigate();

  const isCartEmpty = cartItemsLength === 0;

  const subTitle = isCartEmpty
    ? "장바구니에 상품을 추가해주세요"
    : `현재 ${cartItemsLength}종류의 상품이 담겨있습니다.`;

  const fetchData = async () => {
    const result = await fetchCartItems();
    setCartItems(result);
    setCartPrice(result);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header type="logo" />
      <PageContainer>
        <PageTitle title="장바구니" subTitle={subTitle} />
        {!isCartEmpty ? (
          <>
            <CartItemList />
            <OrderSummary />
          </>
        ) : (
          <CartEmptyScreen />
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
  background-color: white;
`;
