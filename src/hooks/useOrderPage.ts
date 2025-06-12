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
import { BASE_URL, URL_LOCATION } from '../constants/url';
import { useNavigate } from 'react-router-dom';

const useOrderPage = () => {
  const navigate = useNavigate();
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
  const handleBottomButton = () =>
    navigate(BASE_URL + URL_LOCATION.CONFIRM, {
      state: {
        cartItems,
        checkedCartIds,
        totalPrice: orderPrice + deliveryPrice - discountPrice,
      },
    });

  useEffect(() => {
    initCheckedCouponIds(
      getAvailableCoupons(coupons, checkedCartItems, deliveryPrice),
      checkedCartItems,
      deliveryPrice,
      MAX_COUPON_AMOUNT
    );
  }, [deliveryPrice]);

  const handleClickDeliveryCheckbox = () => setDeliveryChecked((prev) => !prev);

  return {
    deliveryChecked,
    handleClickDeliveryCheckbox,
    orderPrice,
    deliveryPrice,
    discountPrice,
    handleBottomButton,
  };
};

export default useOrderPage;
