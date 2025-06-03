import { OrderPrice } from "../OrderPrice";

function OrderList({
  cartItemsInfo,
}: {
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
}) {
  return (
    <OrderPrice gap={12}>
      <OrderPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
      <OrderPrice.Wrap gap={8}>
        <OrderPrice.LabelWithPrice label="주문 금액" price={cartItemsInfo.orderPrice} />
        <OrderPrice.LabelWithPrice label="배송비" price={cartItemsInfo.deliveryPrice} />
      </OrderPrice.Wrap>
      <OrderPrice.Wrap>
        <OrderPrice.LabelWithPrice label="총 결제 금액" price={cartItemsInfo.totalPrice} />
      </OrderPrice.Wrap>
    </OrderPrice>
  );
}

export default OrderList;
