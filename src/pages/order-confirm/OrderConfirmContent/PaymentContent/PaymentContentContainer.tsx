import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useGetCoupon } from "@/pages/order-confirm/hooks/useGetCoupon";
import Fallback from "@/shared/components/Fallback/Fallback";
import PaymentContent from "./PaymentContent";

type PaymentContainerProps = {
  orderList: CartItemType[];
};

export function PaymentContentContainer({ orderList }: PaymentContainerProps) {
  const { couponList, isLoading, errorMessage } = useGetCoupon();

  if (isLoading) {
    return <Fallback type="loading" message="쿠폰 정보를 적용하는 중입니다." />;
  }

  if (errorMessage) {
    return <Fallback type="error" message={errorMessage} />;
  }

  return <PaymentContent orderList={orderList} couponList={couponList} />;
}
