import { useLocation } from 'react-router';
import { getCartItems, getCoupons } from '../../apis/cart';
import { useData } from '../../context/DataContext';
import { CouponType } from '../../types/cart';
import CouponItem from './CouponItem';
import { useEffect } from 'react';
import { useOrder } from '../../context/OrderContext';
import { useCoupon } from '../../context/CouponContext';
import { useShipping } from '../../context/ShippingContext';

function CouponList() {
  const { data: coupons } = useData({
    fetcher: getCoupons,
    name: 'couponData',
  });
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });
  const { price, shippingFee } = useOrder();
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
