import { useGetCoupon } from "@/pages/order-confirm/hooks/useGetCoupon";
import Fallback from "@/shared/components/Fallback/Fallback";
import ApplyCouponModal from "./ApplyCouponModal";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

type ApplyCouponModalContainerProps = {
  isOpen: boolean;
  orderList: CartItemType[];
  deliveryPrice: number;
  onRequestClose: () => void;
  onApplyCoupon: (discount: number) => void;
};

export function ApplyCouponModalContainer(
  props: ApplyCouponModalContainerProps
) {
  const { couponList, isLoading, errorMessage } = useGetCoupon();

  if (isLoading) {
    return <Fallback type="loading" message="쿠폰 정보를 적용하는 중입니다." />;
  }

  if (errorMessage) {
    return <Fallback type="error" message={errorMessage} />;
  }

  return <ApplyCouponModal couponList={couponList} {...props} />;
}
