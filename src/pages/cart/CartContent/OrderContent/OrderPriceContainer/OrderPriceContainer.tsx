import PriceContainer from "@/domains/components/PriceContainer/PriceContainer";

type OrderPriceContainerProps = {
  orderTotalPrice: number;
  deliveryPrice: number;
  paymentPrice: number;
};

export default function OrderPriceContainer({
  orderTotalPrice,
  deliveryPrice,
  paymentPrice,
}: OrderPriceContainerProps) {
  return (
    <PriceContainer
      priceList={[
        {
          title: "주문 금액",
          price: orderTotalPrice,
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
