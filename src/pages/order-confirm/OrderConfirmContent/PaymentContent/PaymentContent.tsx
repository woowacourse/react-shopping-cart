import ApplyCouponButton from "./ApplyCouponButton/ApplyCouponButton";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentButton from "./PaymentButton/PaymentButton";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getPaymentPrice } from "../../utils/getPaymentPrice";
import { useCouponModal } from "../../hooks/useCouponModal";
import { useRegionDeliveryPrice } from "../../hooks/useRegionDeliveryPrice";
import PaymentPriceContainer from "./PaymentPriceContainer/PaymentPriceContainer";
import { Coupon } from "@/apis/coupon/coupon.type";
import ApplyCouponModal from "./ApplyCouponModal/ApplyCouponModal";
import { useApplyCoupon } from "../../hooks/useApplyCoupon";

type PaymentContentProps = {
  orderList: CartItemType[];
  couponList: Coupon[];
};

export default function PaymentContent({
  orderList,
  couponList,
}: PaymentContentProps) {
  const [isOpenCouponModal, openCouponModal, closeCouponModal] =
    useCouponModal();

  const { deliveryPrice, isRegionDelivery, toggleRegionDelivery } =
    useRegionDeliveryPrice(getOrderTotalPrice(orderList));
  const { couponDiscount, applyCouponIds } = useApplyCoupon({
    deliveryPrice,
    orderList,
    couponList,
  });
  const paymentPrice = getPaymentPrice({
    orderTotalPrice: getOrderTotalPrice(orderList),
    deliveryPrice,
    couponDiscount,
  });

  return (
    <>
      <ApplyCouponButton onClick={openCouponModal} />
      <ApplyCouponModal
        isOpen={isOpenCouponModal}
        couponList={couponList}
        orderList={orderList}
        deliveryPrice={deliveryPrice}
        onRequestClose={closeCouponModal}
        onApplyCoupon={applyCouponIds}
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
