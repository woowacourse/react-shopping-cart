import ApplyCouponButton from "./ApplyCouponButton/ApplyCouponButton";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PaymentButton from "./PaymentButton/PaymentButton";
import ApplyCouponModal from "./ApplyCouponModal/ApplyCouponModal";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useGetCoupon } from "../../hooks/useGetCoupon";
import Fallback from "@/shared/components/Fallback";
import { usePaymentPrice } from "../../hooks/usePaymentPrice";
import { useCouponModal } from "../../hooks/useCouponModal";
import { useDeliveryPrice } from "../../hooks/useDeliveryPrice";
import PaymentPriceContainer from "./PaymentPriceContainer/PaymentPriceContainer";

type PaymentContentProps = {
  orderList: CartItemType[];
};

export default function PaymentContent({ orderList }: PaymentContentProps) {
  const { couponList, isLoading, errorMessage } = useGetCoupon();
  const [isOpenCouponModal, openCouponModal, closeCouponModal] =
    useCouponModal();

  const { deliveryPrice, isRegionDelivery, toggleRegionDelivery } =
    useDeliveryPrice(getOrderTotalPrice(orderList));
  const { couponDiscount, paymentPrice, applyCouponDiscount } = usePaymentPrice(
    { orderTotalPrice: getOrderTotalPrice(orderList), deliveryPrice }
  );

  if (errorMessage) {
    return <Fallback type="error" message={errorMessage} />;
  }

  return (
    <>
      {isLoading ? (
        <Fallback type="loading" message="쿠폰 정보를 적용하는 중입니다." />
      ) : (
        <>
          <ApplyCouponButton onClick={openCouponModal} />
          <ApplyCouponModal
            isOpen={isOpenCouponModal}
            orderList={orderList}
            couponList={couponList}
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
        </>
      )}
      <PaymentButton
        orderList={orderList}
        paymentPrice={paymentPrice}
        disabled={isLoading || !!errorMessage}
      />
    </>
  );
}
