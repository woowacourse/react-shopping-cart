import { PaymentPrice } from "../../../../components/PaymentPrice";
import { useCartItems } from "../../contexts/CartItemsContext";
import { calculatePrices } from "../../utils/cartCalculations";

function PaymentPriceList({ checkedIds }: { checkedIds: number[] }) {
  const { cartItems } = useCartItems();
  const { orderPrice, deliveryPrice, totalPrice } = calculatePrices(cartItems, checkedIds);
  return (
    <PaymentPrice gap={12}>
      <PaymentPrice.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
      <PaymentPrice.Wrap gap={8}>
        <PaymentPrice.LabelWithPrice label="주문 금액" price={orderPrice} />
        <PaymentPrice.LabelWithPrice label="배송비" price={deliveryPrice} />
      </PaymentPrice.Wrap>
      <PaymentPrice.Wrap>
        <PaymentPrice.LabelWithPrice label="총 결제 금액" price={totalPrice} />
      </PaymentPrice.Wrap>
    </PaymentPrice>
  );
}

export default PaymentPriceList;
