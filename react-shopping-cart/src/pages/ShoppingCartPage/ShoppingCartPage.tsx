import { useSelector } from "react-redux";

import CartLeftSection from "component/ShoppingCart/CartLeftSection/CartLeftSection";
import ExpectedPaymentContainer from "component/@shared/PaymentContainer/PaymentContainer";

import { ColumnFlexWrapper } from "styles/Wrapper";
import {
  ShoppingCartPageHeader,
  ShoppingCartPageContent,
} from "./ShoppingCartPage.style";

import { selectCurrentCarts } from "redux/carts/carts.selector";
import { CURRENT_USER } from "constants/index";

function ShoppingCartPage() {
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
    <ColumnFlexWrapper gap="30px">
      <ShoppingCartPageHeader>장바구니</ShoppingCartPageHeader>
      <ShoppingCartPageContent gap="60px">
        <CartLeftSection />
        <ExpectedPaymentContainer
          totalPaymentCost={totalPaymentCost}
          label="결제예상금액"
          buttonText={`주문하기(${totalOrderProductsQuantity}개)`}
        />
      </ShoppingCartPageContent>
    </ColumnFlexWrapper>
  );
}

export default ShoppingCartPage;
