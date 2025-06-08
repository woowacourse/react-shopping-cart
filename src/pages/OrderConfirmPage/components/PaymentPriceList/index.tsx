import { PaymentPrice } from "../../../../components/PaymentPrice";
import { CartItemContent } from "../../../../types/cartItem";

function PaymentPriceList({ orderItems }: { orderItems: CartItemContent[] }) {
  const calculatePrices = (orderItems: CartItemContent[]) => {
    const orderPrice = orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryPrice = orderPrice < 100000 && orderPrice > 0 ? 3000 : 0;
    const totalPrice = orderPrice + deliveryPrice;
    return { orderPrice, deliveryPrice, totalPrice };
  };

  const { orderPrice, deliveryPrice, totalPrice } = calculatePrices(orderItems);
  return (
    <PaymentPrice gap={12}>
      <PaymentPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
      <PaymentPrice.Wrap gap={8}>
        <PaymentPrice.LabelWithPrice label="주문 금액" price={orderPrice} />
        <PaymentPrice.LabelWithPrice label="쿠폰 할인 금액" price={orderPrice} />
        <PaymentPrice.LabelWithPrice label="배송비" price={deliveryPrice} />
      </PaymentPrice.Wrap>
      <PaymentPrice.Wrap>
        <PaymentPrice.LabelWithPrice label="총 결제 금액" price={totalPrice} />
      </PaymentPrice.Wrap>
    </PaymentPrice>
  );
}

export default PaymentPriceList;
