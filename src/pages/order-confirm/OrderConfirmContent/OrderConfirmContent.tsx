import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import * as S from "./OrderConfirmContent.styled";
import OrderList from "./OrderList/OrderList";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getOrderQuantity } from "@/domains/utils/getOrderQuantity";
import { PaymentContentContainer } from "./PaymentContent/PaymentContentContainer";

type OrderConfirmContentProps = {
  orderList: CartItemType[];
};

export default function OrderConfirmContent({
  orderList,
}: OrderConfirmContentProps) {
  return (
    <S.Container>
      <OrderSummary
        title="주문 확인"
        orderListCount={orderList.length}
        orderQuantity={getOrderQuantity(orderList)}
      />
      <OrderList orderList={orderList} />
      <PaymentContentContainer orderList={orderList} />
    </S.Container>
  );
}
