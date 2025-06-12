import { useEffect, useMemo, useState, useCallback } from 'react';
import getCoupons from '../api/getCoupons';
import { useCartItemsContext } from '../contexts/CartItems/CartItemsContext';
import { useCheckCartIdsContext } from '../contexts/CheckedCartIds/CheckedCartIdsContext';
import getOrderPrice from '../utils/getOrderPrice';
import { useErrorToast } from '../contexts/ErrorToast/ErrorToastContext';
import { Coupon } from '../types';
import calculateCouponDiscount from '../utils/calculateCouponDiscount';
import calculateDeliveryPrice from '../utils/calculateDeliveryPrice';
import { useShippingContext } from '../contexts/Shipping/ShippingContext';
import { getCurrentDate } from '../utils/getCurrentDate';
import { isCouponValid } from '../utils/isCouponValid';
import getMaxQuantity from '../utils/getMaxQuantity';

const MAX_SELECTABLE_COUPONS = 2;

const useCoupons = () => {
  const { checkedCartIds } = useCheckCartIdsContext();
  const { cartItems } = useCartItemsContext();
  const { isRemoteArea } = useShippingContext();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const { showError } = useErrorToast();

  const fetchCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (e) {
      showError('쿠폰을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const selectedCartItems = useMemo(
    () => cartItems.filter((item) => checkedCartIds.includes(item.id)),
    [cartItems, checkedCartIds]
  );
  const orderPrice = useMemo(
    () => getOrderPrice(cartItems, checkedCartIds),
    [cartItems, checkedCartIds]
  );
  const maxQuantity = useMemo(
    () => getMaxQuantity(selectedCartItems),
    [selectedCartItems]
  );
  const currentHour = getCurrentDate().getHours();

  const validCoupons = useMemo(() => {
    return coupons.filter((coupon) =>
      isCouponValid(coupon, { orderPrice, maxQuantity, currentHour })
    );
  }, [coupons, orderPrice, maxQuantity, currentHour]);

  const deliveryPrice = calculateDeliveryPrice(orderPrice, isRemoteArea);

  const couponDiscount = calculateCouponDiscount({
    coupons: selectedCoupons,
    checkedCartItems: selectedCartItems,
    orderPrice,
    deliveryPrice,
  });

  const selectCoupon = useCallback(
    (id: number) => {
      setSelectedCoupons((prev) => {
        if (prev.some((c) => c.id === id)) return prev;
        if (prev.length >= MAX_SELECTABLE_COUPONS) return prev;

        const coupon = validCoupons.find((c) => c.id === id);
        return coupon ? [...prev, coupon] : prev;
      });
    },
    [validCoupons]
  );

  const unselectCoupon = useCallback((id: number) => {
    setSelectedCoupons((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const init = useCallback(() => {
    setSelectedCoupons([]);
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const value = useMemo(() => {
    return {
      coupons,
      validCoupons,
      selectedCoupons,
      couponDiscount,
      selectCoupon,
      unselectCoupon,
      init,
    };
  }, [
    coupons,
    validCoupons,
    selectedCoupons,
    couponDiscount,
    selectCoupon,
    unselectCoupon,
    init,
  ]);

  return value;
};

export default useCoupons;
