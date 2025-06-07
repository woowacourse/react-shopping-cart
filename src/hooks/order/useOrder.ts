import { CartItem } from "../../types/cartItem";
import useCouponApply from "./useCouponApply";
import useCouponResource from "./useCouponResource";
import useDeliveryInformation from "./useDeliveryInformation";

interface useOrderParams {
  cartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
}

const useOrder = ({ cartItems, orderPrice, deliveryPrice }: useOrderParams) => {
  const { coupons } = useCouponResource();

  const { availableCoupons, discountPrice, updateApplyCoupon } = useCouponApply({
    cartItems,
    orderPrice,
    coupons,
  });
  const { isRemoteArea, toggleRemoteArea } = useDeliveryInformation();

  const finalDeliveryPrice = isRemoteArea ? deliveryPrice + 3000 : deliveryPrice;
  const finalTotalPrice = orderPrice - discountPrice + finalDeliveryPrice;

  return {
    coupons,
    availableCoupons,
    updateApplyCoupon,
    finalDeliveryPrice,
    discountPrice,
    finalTotalPrice,
    isRemoteArea,
    toggleRemoteArea,
  };
};

export default useOrder;
