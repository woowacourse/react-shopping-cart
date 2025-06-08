import { Price } from "../../../../components/Price";
import { useCartContext } from "../../contexts/CartContext";

const CartPrice = () => {
  const { cartItemsInfo } = useCartContext();

  return (
    <Price gap={12}>
      <Price.Description text="총 주문 금액이 100,000원 이상일 경우 무료 배송이 됩니다." />
      <Price.Wrap gap={8}>
        <Price.WithLabel label="주문 금액" price={cartItemsInfo.orderPrice} />
        <Price.WithLabel label="배송비" price={cartItemsInfo.deliveryPrice} />
      </Price.Wrap>
      <Price.Wrap>
        <Price.WithLabel label="총 결제 금액" price={cartItemsInfo.totalPrice} />
      </Price.Wrap>
    </Price>
  );
};

export default CartPrice;
