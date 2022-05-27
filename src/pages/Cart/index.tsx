import { useNavigate } from "react-router-dom";
import { useCartAmount } from "../../hooks/useCartSelector";

import PageTitle from "../../components/PageTitle/styles";
import CartProductList from "../../components/CartProductList";
import PaymentBox from "../../components/PaymentBox";
import routes from "../../routes";
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
          onClick={() => navigate(routes.orderList)}
          buttonName="주문하기"
        />
      </GridContainer>
    </CartPageContainer>
  );
}

export default Cart;
