import { getCoupons } from '@/api/order';
import { CartItemList } from '@/features/Cart/types/Cart.types';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { useCouponLogic } from './useCouponLogic';
import { useCouponSelection } from './useCouponSelection';
import { useDelivery } from './useDelivery';

import { CouponResponse } from '../type/coupon.type';
import { calculatePriceDetails } from '../utils/calculatePrice';

export const useCoupons = ({ cartItems }: CartItemList) => {
  const couponData = useFetchData<CouponResponse[]>({ autoFetch: getCoupons });
  const couponSelection = useCouponSelection();
  const delivery = useDelivery();
  const { totalPrice, deliveryFee, totalItemLength } = calculatePriceDetails({
    cartItems,
    specialDeliveryZone: delivery.specialDeliveryZone,
  });

  const couponLogic = useCouponLogic({
    coupons: couponData.data ?? [],
    cartItems,
    totalPrice: totalPrice,
    specialDeliveryZone: delivery.specialDeliveryZone,
    checkedCoupons: couponSelection.checkedCoupons,
    isAutoMode: couponSelection.isAutoMode,
  });

  return {
    coupons: couponLogic.couponItems,
    applyCoupon: couponSelection.applyCoupon,
    couponDiscount: couponLogic.couponDiscount,
    isAutoMode: couponSelection.isAutoMode,

    totalPrice: totalPrice,
    deliveryFee: deliveryFee,
    totalItemLength: totalItemLength,

    specialDeliveryZone: delivery.specialDeliveryZone,
    selectedSpecialDeliveryZone: delivery.toggleSpecialDeliveryZone,
  };
};
