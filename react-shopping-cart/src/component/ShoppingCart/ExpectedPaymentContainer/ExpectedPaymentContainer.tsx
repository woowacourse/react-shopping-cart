import { useSelector } from "react-redux";

import ExpectedPaymentBox from "component/ShoppingCart/ExpectedPaymentBox/ExpectedPaymentBox";
import OrderButton from "component/@shared/OrderButton/OrderButton";
import {
  ExpectedPaymentTopContainer,
  ExpectedPaymentBottomContainer,
  ExpectedPaymentWrapper,
} from "./ExpectedPaymentContainer.style";

import { selectCurrentCarts } from "redux/carts/carts.selector";
import { CURRENT_USER } from "constants/index";

function ExpectedPaymentContainer() {
  const carts = useSelector(selectCurrentCarts);

  const totalPaymentCost = carts.reduce((acc, cart) => {
    if (cart.user === CURRENT_USER && cart.checked) {
      return acc + Number(cart.price) * Number(cart.quantity);
    }
    return acc;
  }, 0);

  const totalOrderProductsQuantity = carts.reduce((acc, cart) => {
    if (cart.user === CURRENT_USER && cart.checked) {
      return acc + Number(cart.quantity);
    }
    return acc;
  }, 0);

  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentTopContainer>결제예상금액</ExpectedPaymentTopContainer>
      <ExpectedPaymentBottomContainer>
        <ExpectedPaymentBox price={totalPaymentCost} />
        <OrderButton>{`주문하기(${totalOrderProductsQuantity}개)`}</OrderButton>
      </ExpectedPaymentBottomContainer>
    </ExpectedPaymentWrapper>
  );
}

export default ExpectedPaymentContainer;
