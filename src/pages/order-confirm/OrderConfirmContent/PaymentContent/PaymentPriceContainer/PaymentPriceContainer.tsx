import PriceContainer from "@/domains/components/PriceContainer/PriceContainer";

type PaymentPriceContainerProps = {
  orderTotalPrice: number;
  deliveryPrice: number;
  couponDiscount: number;
  paymentPrice: number;
};

export default function PaymentPriceContainer({
  orderTotalPrice,
  deliveryPrice,
  couponDiscount,
  paymentPrice,
}: PaymentPriceContainerProps) {
  return (
    <PriceContainer
      priceList={[
        {
          title: "주문 금액",
          price: orderTotalPrice,
        },
        {
          title: "쿠폰 할인 금액",
          price: -couponDiscount,
        },
        {
          title: "배송비",
          price: deliveryPrice,
        },
      ]}
      paymentPrice={paymentPrice}
    />
  );
}
