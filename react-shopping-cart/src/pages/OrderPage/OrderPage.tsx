import PaymentContainer from "component/@shared/PaymentContainer/PaymentContainer";
import PaymentPageHeader from "component/@shared/PaymentPageHeader/PaymentPageHeader";
import OrderLeftSection from "component/Order/OrderLeftSection/OrderLeftSection";
import { CURRENT_USER, ROUTE_PATH } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrderStart } from "redux/orders/orders.action";
import { selectCurrentOrders } from "redux/orders/orders.selector";
import { ColumnFlexWrapper } from "styles/Wrapper";
import { OrderPageContent } from "pages/OrderPage/OrderPage.style";

function OrderPage() {
  const orders = useSelector(selectCurrentOrders);
  const ordersIdList = orders.map((order) => order.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPaymentCost = orders.reduce((acc, order) => {
    if (order.user === CURRENT_USER) {
      return acc + Number(order.price) * Number(order.quantity);
    }
    return acc;
  }, 0);

  const handleOrderButtonClick = () => {
    dispatch(deleteOrderStart(ordersIdList));
    window.alert("주문이 완료되었습니다");
    navigate(ROUTE_PATH.ROOT);
  };

  return (
    <ColumnFlexWrapper gap="30px">
      <PaymentPageHeader>주문/결제</PaymentPageHeader>
      <OrderPageContent gap="60px">
        <OrderLeftSection />
        <PaymentContainer
          totalPaymentCost={totalPaymentCost}
          label="총 결제금액"
          buttonText={`${totalPaymentCost} 원 결제하기`}
          handleOrderButtonClick={handleOrderButtonClick}
        />
      </OrderPageContent>
    </ColumnFlexWrapper>
  );
}

export default OrderPage;
