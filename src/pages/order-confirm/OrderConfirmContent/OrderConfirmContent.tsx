import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import * as S from "./OrderConfirmContent.styled";
import OrderList from "../OrderList/OrderList";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import PriceContainer from "@/domains/components/PriceContainer/PriceContainer";
import PaymentButton from "../PaymentButton/PaymentButton";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

type OrderConfirmContentProps = {
  orderList: CartItemType[];
  orderListCount: number;
  orderQuantity: number;
  paymentPrice: number;
};

export default function OrderConfirmContent({
  orderList,
  orderListCount,
  orderQuantity,
  paymentPrice,
}: OrderConfirmContentProps) {
  const priceList = [
    {
      title: "주문 금액",
      price: getOrderTotalPrice(orderList),
    },
    {
      title: "쿠폰 할인 금액",
      price: -0,
    },
    {
      title: "배송비",
      price: getDeliveryPrice(getOrderTotalPrice(orderList)),
    },
  ];
  return (
    <>
      <S.Container>
        <OrderSummary
          title="주문 확인"
          orderListCount={orderListCount}
          orderQuantity={orderQuantity}
        />
        <OrderList orderList={orderList} />
        <ApplyCouponButton />
        <DeliveryInfo />
        <PriceContainer priceList={priceList} paymentPrice={paymentPrice} />
      </S.Container>
      <PaymentButton orderList={orderList} paymentPrice={paymentPrice} />
    </>
  );
}
