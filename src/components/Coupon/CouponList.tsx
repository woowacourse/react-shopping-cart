import { useLocation } from 'react-router';
import { CouponType } from '../../types/cart';
import CouponItem from './CouponItem';
import { useEffect } from 'react';
import { useCoupon } from '../../context/CouponContext';
import { useShipping } from '../../context/ShippingContext';
import { useCartData, useCouponData } from '../../utils/fetcher';
import { useOrderSummary } from '../../hooks/useOrderSummary';

function CouponList() {
  const { data: cartItems } = useCartData();
  const { data: coupons } = useCouponData();
  const { price, shippingFee } = useOrderSummary();
  const { selectedCoupons, handleCouponSelect, calculateTotalDiscount, checkCouponsDisable } =
    useCoupon();
  const { isExtraShippingFee } = useShipping();
  const { state } = useLocation();

  useEffect(() => {
    calculateTotalDiscount(
      cartItems?.content || [],
      state.checkedItems,
      price,
      shippingFee,
      isExtraShippingFee,
    );
  }, [
    selectedCoupons,
    cartItems,
    state.checkedItems,
    calculateTotalDiscount,
    price,
    shippingFee,
    isExtraShippingFee,
  ]);

  return (
    <>
      {coupons?.map((couponItem: CouponType) => (
        <CouponItem
          key={couponItem.id}
          coupon={couponItem}
          isSelected={selectedCoupons.some((coupon) => coupon.id === couponItem.id)}
          onSelect={() => handleCouponSelect(couponItem)}
          disabled={checkCouponsDisable(couponItem, price)}
        />
      ))}
    </>
  );
}

export default CouponList;
