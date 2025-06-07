import { PaymentPrice } from "../../../../components/PaymentPrice";

function PaymentPriceList({
  cartItemsInfo,
}: {
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
}) {
  return (
    <PaymentPrice gap={12}>
      <PaymentPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
      <PaymentPrice.Wrap gap={8}>
        <PaymentPrice.LabelWithPrice label="주문 금액" price={cartItemsInfo.orderPrice} />
        <PaymentPrice.LabelWithPrice label="쿠폰 할인 금액" price={cartItemsInfo.orderPrice} />
        <PaymentPrice.LabelWithPrice label="배송비" price={cartItemsInfo.deliveryPrice} />
      </PaymentPrice.Wrap>
      <PaymentPrice.Wrap>
        <PaymentPrice.LabelWithPrice label="총 결제 금액" price={cartItemsInfo.totalPrice} />
      </PaymentPrice.Wrap>
    </PaymentPrice>
  );
}

export default PaymentPriceList;
