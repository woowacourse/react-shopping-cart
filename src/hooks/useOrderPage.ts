import { useEffect, useState } from 'react';
import { useCouponContext } from '../contexts/CouponContext';
import { applyCouponsToItems, getAvailableCoupons, getCheckedItems, getOrderPrice } from '../utils';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import {
  DELIVERY_PRICE,
  DELIVERY_PRICE_THRESHOLD,
  DISTANCE_DELIVERY_PRICE,
  MAX_COUPON_AMOUNT,
} from '../constants/config';

const useOrderPage = () => {
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const { coupons, checkedCouponIds, initCheckedCouponIds } = useCouponContext();
  const checkedCartItems = getCheckedItems(cartItems, checkedCartIds);
  const checkedCoupons = coupons.filter((coupon) => checkedCouponIds.includes(coupon.id));
  const orderPrice = getOrderPrice(cartItems, checkedCartIds);
  const deliveryPrice =
    (orderPrice >= DELIVERY_PRICE_THRESHOLD || orderPrice === 0 ? 0 : DELIVERY_PRICE) +
    (deliveryChecked ? DISTANCE_DELIVERY_PRICE : 0);
  const discountPrice = Math.max(
    applyCouponsToItems(checkedCartItems, deliveryPrice, checkedCoupons),
    0
  );

  useEffect(() => {
    initCheckedCouponIds(
      getAvailableCoupons(coupons, checkedCartItems),
      checkedCartItems,
      deliveryPrice,
      MAX_COUPON_AMOUNT
    );
  }, [deliveryPrice]);

  const handleClickDeliveryCheckbox = () => setDeliveryChecked((prev) => !prev);

  return { deliveryChecked, handleClickDeliveryCheckbox, deliveryPrice, discountPrice };
};

export default useOrderPage;
