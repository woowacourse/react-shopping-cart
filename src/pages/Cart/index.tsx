import { useNavigate } from "react-router-dom";
import { useCartAmount } from "../../hooks/useCartSelector";

import Button from "../../components/@shared/Button/styles";
import PageTitle from "../../components/PageTitle/styles";
import CartProductList from "../../components/CartProductList";
import PaymentBox from "../../components/PaymentBox";
import { GridContainer, CartPageContainer } from "./styles";

function Cart() {
  const navigate = useNavigate();
  const totalAmount = useCartAmount();

  return (
    <CartPageContainer>
      <PageTitle>장바구니</PageTitle>
      <GridContainer>
        <CartProductList />
        <PaymentBox
          title="결제 예상 금액"
          subTitle="결제 예상 금액"
          amount={totalAmount.toLocaleString()}
        >
          <Button onClick={() => navigate("/order-list")}>주문하기</Button>
        </PaymentBox>
      </GridContainer>
    </CartPageContainer>
  );
}

export default Cart;
