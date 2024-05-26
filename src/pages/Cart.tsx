import { CART_MESSAGE } from "@/constants/message";
import CartList from "@/components/Cart/CartList";
import CartSummary from "@/components/Cart/CartSummary";
import CartTitle from "@/components/Cart/CartTitle";
import EmptyCart from "@/components/Cart/EmptyCart";
import FullWidthButton from "@/components/common/Button/FullWidthButton";
import Header from "@/components/Header.tsx";
import { cartListState } from "@/store/atoms/atoms";
import { cartSummaryState } from "@/store/selectors/summarySelector/cartSummarySelector";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Cart = () => {
  const navigate = useNavigate();
  const { orderPrice } = useRecoilValue(cartSummaryState);

  const cartList = useRecoilValue(cartListState);

  return (
    <>
      <StyledFixedTop>
        <Header />
      </StyledFixedTop>
      {cartList.length ? (
        <>
          <StyledScrollBox>
            <CartTitle
              title="장바구니"
              details={[CART_MESSAGE.totalProducts(cartList.length)]}
            />
            <CartList />
          </StyledScrollBox>
          <StyledFixedBottom>
            <CartSummary />
            <FullWidthButton
              onClick={() => {
                navigate("/order-confirm");
              }}
              disabled={orderPrice === 0 ? true : false}
            >
              주문 확인
            </FullWidthButton>
          </StyledFixedBottom>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};
export default Cart;

const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

const StyledScrollBox = styled.div`
  margin-top: 64px;
  overflow-y: scroll;
  height: calc(100vh - 230px);
  width: 430px;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;
