import PageTitle from "../components/common/PageTitle";
import styled from "styled-components";
import CartItemList from "../components/ShoppingCart/CartItemList/index";
import OrderSummary from "../components/ShoppingCart/OrderSummary";
import { useRecoilValue } from "recoil";
import { checkedCartItemsQuantityState } from "../recoil/selectors";
import FooterButton from "../components/common/FooterButton/index";
import CartEmptyScreen from "../components/ShoppingCart/CartEmptyScreen/index";
import { useNavigate } from "react-router-dom";
import PAGE_URL from "../constants/pageURL";
import Header from "../components/common/Header/index";
import { COLOR } from "../constants/styles";
import { SHOPPING_MESSAGE } from "../constants/messages";
import useFetchCartItems from "../hooks/useFetchCartItems";

const ShoppingCart = () => {
  const { cartItems, removeCartItem } = useFetchCartItems();
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);

  const router = useNavigate();

  const cartItemsLength = cartItems.length;
  const isCartEmpty = cartItemsLength === 0;

  const subTitle = isCartEmpty ? SHOPPING_MESSAGE.cartAdd : SHOPPING_MESSAGE.currentBasket(cartItemsLength);

  return (
    <>
      <Header type="logo" />
      <PageContainer>
        <PageTitle title={SHOPPING_MESSAGE.basket} subTitle={subTitle} />
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
          buttonText={SHOPPING_MESSAGE.confirmOrder}
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
