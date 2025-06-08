import { CartItem } from "../../../shared/types/cartItem";
import { REMOTE_AREA_DELIVERY_PRICE } from "../constants";
import useCoupon from "./useCoupon";
import useCouponResource from "./useCouponResource";
import useDeliveryInformation from "./useDeliveryInformation";

interface useOrderParams {
  cartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
}

const useOrder = ({ cartItems, orderPrice, deliveryPrice }: useOrderParams) => {
  const { coupons } = useCouponResource();
  const { isRemoteArea, toggleRemoteArea } = useDeliveryInformation();
  const { availableCoupons, discountPrice, updateApplyCoupon } = useCoupon({
    cartItems,
    orderPrice,
    coupons,
    deliveryPrice,
    isRemoteArea,
  });

  const finalDeliveryPrice = isRemoteArea ? deliveryPrice + REMOTE_AREA_DELIVERY_PRICE : deliveryPrice;
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
