import CartList from "@/components/Cart/CartList";
import CartRecipe from "@/components/Cart/CartRecipe";
import CartTitle from "@/components/Cart/CartTitle";
import EmptyCart from "@/components/EmptyCart";
import FullWidthButton from "@/components/common/Button/FullWidthButton";
import Header from "@/components/Header.tsx";
import { cartListState } from "@/store/atoms";
import { recipeState } from "@/store/selectors/recipeSelector";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Cart = () => {
  const navigate = useNavigate();
  const { orderPrice } = useRecoilValue(recipeState);

  const cartList = useRecoilValue(cartListState);

  return (
    <>
      <StyledFixedTop>
        <Header />
      </StyledFixedTop>
      {cartList.length ? (
        <>
          <StyledScrollBox>
            <CartTitle />
            <CartList />
          </StyledScrollBox>
          <StyledFixedBottom>
            <CartRecipe />
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
