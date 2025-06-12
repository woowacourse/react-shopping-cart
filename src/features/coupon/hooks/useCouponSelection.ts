import { useEffect } from 'react';
import { Coupon } from '../types/coupon';
import { getSelectedCartItemsFromLocalStorage } from '../../cart/utils/localStorageService';
import { calculateTotalDiscountPrice } from '../utils/calculateTotalDiscountPrice';
import useCoupons from './useCoupons';
import { useCartContext } from '../../../shared/context/useCartContext';
import { useCouponContext } from '../../../shared/context/useCouponContext';

export default function useCouponSelection() {
  const { deliveryFee, totalPrice, updateTotalDiscountPrice } = useCartContext();
  const { selectedCoupons, updateSelectedCoupons } = useCouponContext();

  const { coupons, getInvalidCouponIds, getBestTwoCoupons, isCouponLoading, couponError } = useCoupons();

  const selectedCartItems = getSelectedCartItemsFromLocalStorage();

  const highestPrice = Math.max(...selectedCartItems.map((i) => i.product.price));
  const highestPriceCartItem = selectedCartItems.filter((item) => item.product.price === highestPrice)[0];

  const invalidCouponIds = getInvalidCouponIds(totalPrice);

  useEffect(() => {
    if (coupons.length === 0) return;

    const bestTwo = getBestTwoCoupons(highestPriceCartItem, totalPrice, deliveryFee);
    const totalDiscountPrice = bestTwo.coupons.reduce((acc, bestCoupon) => acc + bestCoupon.discountPrice, 0);

    updateTotalDiscountPrice(totalDiscountPrice);
    updateSelectedCoupons(bestTwo.coupons.map((bestCoupon) => bestCoupon.coupon));
  }, [coupons, deliveryFee]);

  useEffect(() => {
    updateTotalDiscountPrice(
      calculateTotalDiscountPrice({
        selectedCoupons,
        highestPriceCartItem,
        totalPrice,
        deliveryFee,
      })
    );
  }, [selectedCoupons]);

  const handleCouponSelection = (selectedCoupon: Coupon) => {
    if (selectedCoupons.length >= 2 && !selectedCoupons.some((coupon) => coupon.id === selectedCoupon.id)) {
      alert('최대 2개의 쿠폰만 선택할 수 있습니다.');
      return;
    }

    const existingCoupon = selectedCoupons.some((coupon) => coupon.id === selectedCoupon.id);
    if (existingCoupon) {
      updateSelectedCoupons(selectedCoupons.filter((coupon) => coupon.id !== selectedCoupon.id));
      return;
    }

    if (selectedCoupons.length <= 1) {
      const updatedCoupons = [...selectedCoupons, selectedCoupon];
      updateSelectedCoupons(updatedCoupons);
    }
  };

  return {
    coupons,
    selectedCoupons,
    highestPriceCartItem,
    getBestTwoCoupons,
    invalidCouponIds,
    isCouponLoading,
    couponError,
    handleCouponSelection,
  };
}
