import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartLeftSection from "component/ShoppingCart/CartLeftSection/CartLeftSection";
import PaymentContainer from "component/@shared/PaymentContainer/PaymentContainer";
import PaymentPageHeader from "component/@shared/PaymentPageHeader/PaymentPageHeader";

import { ColumnFlexWrapper } from "styles/Wrapper";
import { ShoppingCartPageContent } from "./ShoppingCartPage.style";

import { selectCurrentCarts } from "redux/carts/carts.selector";
import { CURRENT_USER, ROUTE_PATH } from "constants/index";

function ShoppingCartPage() {
  const carts = useSelector(selectCurrentCarts);
  const navigate = useNavigate();

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

  const handleOrderButtonClick = () => {
    navigate(ROUTE_PATH.ORDER);
  };

  return (
    <ColumnFlexWrapper gap="30px">
      <PaymentPageHeader>장바구니</PaymentPageHeader>
      <ShoppingCartPageContent gap="60px">
        <CartLeftSection />
        <PaymentContainer
          totalPaymentCost={totalPaymentCost}
          label="결제예상금액"
          buttonText={`주문하기(${totalOrderProductsQuantity}개)`}
          handleOrderButtonClick={handleOrderButtonClick}
        />
      </ShoppingCartPageContent>
    </ColumnFlexWrapper>
  );
}

export default ShoppingCartPage;
