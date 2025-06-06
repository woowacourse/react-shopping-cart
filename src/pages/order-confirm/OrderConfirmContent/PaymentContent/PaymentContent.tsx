import ApplyCouponButton from "./ApplyCouponButton/ApplyCouponButton";
import DeliveryInfo from "./DeliveryInfo/DeliveryInfo";
import PriceContainer from "@/domains/components/PriceContainer/PriceContainer";
import PaymentButton from "./PaymentButton/PaymentButton";
import ApplyCouponModal from "./ApplyCouponModal/ApplyCouponModal";
import useBooleanState from "@/shared/hooks/useBooleanState";
import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useGetCoupon } from "./hooks/useGetCoupon";
import Fallback from "@/shared/components/Fallback";

type PaymentContentProps = {
  orderList: CartItemType[];
};

export default function PaymentContent({ orderList }: PaymentContentProps) {
  const { couponList, isLoading, errorMessage } = useGetCoupon();
  const [isOpenApplyCouponModal, openApplyCouponModal, closeApplyCouponModal] =
    useBooleanState(false);

  if (errorMessage) {
    return <Fallback type="error" message={errorMessage} />;
  }

  const paymentResultPrice =
    getOrderTotalPrice(orderList) +
    getDeliveryPrice(getOrderTotalPrice(orderList));

  return (
    <>
      {isLoading ? (
        <Fallback type="loading" message="쿠폰 정보를 불러오는 중입니다." />
      ) : (
        <>
          <ApplyCouponButton onClick={openApplyCouponModal} />
          <ApplyCouponModal
            isOpen={isOpenApplyCouponModal}
            couponList={couponList}
            onRequestClose={closeApplyCouponModal}
            onApplyCoupon={() => {}}
          />
          <DeliveryInfo />
          <PriceContainer
            priceList={[
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
            ]}
            paymentPrice={paymentResultPrice}
          />
        </>
      )}
      <PaymentButton
        orderList={orderList}
        paymentPrice={paymentResultPrice}
        disabled={isLoading || !!errorMessage}
      />
    </>
  );
}
