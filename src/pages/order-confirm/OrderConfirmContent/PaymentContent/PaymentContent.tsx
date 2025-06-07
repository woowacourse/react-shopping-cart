import ApplyCouponButton from "./ApplyCouponButton/ApplyCouponButton";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentButton from "./PaymentButton/PaymentButton";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { usePaymentPrice } from "../../hooks/usePaymentPrice";
import { useCouponModal } from "../../hooks/useCouponModal";
import { useDeliveryPrice } from "../../hooks/useDeliveryPrice";
import PaymentPriceContainer from "./PaymentPriceContainer/PaymentPriceContainer";
import { ApplyCouponModalContainer } from "./ApplyCouponModal/ApplyCouponModalContainer";

type PaymentContentProps = {
  orderList: CartItemType[];
};

export default function PaymentContent({ orderList }: PaymentContentProps) {
  const [isOpenCouponModal, openCouponModal, closeCouponModal] =
    useCouponModal();

  const { deliveryPrice, isRegionDelivery, toggleRegionDelivery } =
    useDeliveryPrice(getOrderTotalPrice(orderList));
  const { couponDiscount, paymentPrice, applyCouponDiscount } = usePaymentPrice(
    { orderTotalPrice: getOrderTotalPrice(orderList), deliveryPrice }
  );

  return (
    <>
      <ApplyCouponButton onClick={openCouponModal} />
      <ApplyCouponModalContainer
        isOpen={isOpenCouponModal}
        orderList={orderList}
        deliveryPrice={deliveryPrice}
        onRequestClose={closeCouponModal}
        onApplyCoupon={applyCouponDiscount}
      />
      <DeliveryInfo
        isChecked={isRegionDelivery}
        onClick={toggleRegionDelivery}
      />
      <PaymentPriceContainer
        orderTotalPrice={getOrderTotalPrice(orderList)}
        deliveryPrice={deliveryPrice}
        couponDiscount={couponDiscount}
        paymentPrice={paymentPrice}
      />
      <PaymentButton orderList={orderList} paymentPrice={paymentPrice} />
    </>
  );
}
