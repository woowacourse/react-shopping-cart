import PaymentContainer from "component/@shared/PaymentContainer/PaymentContainer";
import PaymentPageHeader from "component/@shared/PaymentPageHeader/PaymentPageHeader";
import OrderLeftSection from "component/Order/OrderLeftSection/OrderLeftSection";
import { CURRENT_USER } from "constants/index";
import { useSelector } from "react-redux";
import { selectCurrentCarts } from "redux/carts/carts.selector";
import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";

function OrderPage() {
  const carts = useSelector(selectCurrentCarts);

  const totalPaymentCost = carts.reduce((acc, cart) => {
    if (cart.user === CURRENT_USER && cart.checked) {
      return acc + Number(cart.price) * Number(cart.quantity);
    }
    return acc;
  }, 0);

  return (
    <ColumnFlexWrapper gap="30px">
      <PaymentPageHeader>주문/결제</PaymentPageHeader>
      <RowFlexWrapper gap="60px">
        <OrderLeftSection />
        <PaymentContainer
          totalPaymentCost={totalPaymentCost}
          label="총 결제금액"
          buttonText={`${totalPaymentCost} 원 결제하기`}
        />
      </RowFlexWrapper>
    </ColumnFlexWrapper>
  );
}

export default OrderPage;
