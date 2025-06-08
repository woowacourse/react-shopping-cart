import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import * as S from "./OrderConfirmContent.styled";
import OrderList from "./OrderList/OrderList";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import PaymentContent from "./PaymentContent/PaymentContent";

type OrderConfirmContentProps = {
  orderList: CartItemType[];
  orderListCount: number;
  orderQuantity: number;
};

export default function OrderConfirmContent({
  orderList,
  orderListCount,
  orderQuantity,
}: OrderConfirmContentProps) {
  return (
    <S.Container>
      <OrderSummary
        title="주문 확인"
        orderListCount={orderListCount}
        orderQuantity={orderQuantity}
      />
      <OrderList orderList={orderList} />
      <PaymentContent orderList={orderList} />
    </S.Container>
  );
}
