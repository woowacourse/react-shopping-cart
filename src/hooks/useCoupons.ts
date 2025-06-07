import { useEffect, useMemo, useState } from 'react';
import getCoupons from '../api/getCoupons';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { useCheckCartIdsContext } from '../contexts/CheckedCartIdsContext';
import getOrderPrice from '../utils/getOrderPrice';
import { useErrorToast } from '../contexts/ErrorToastContext';
import { Coupon } from '../types';
import calculateCouponDiscount from '../utils/calculateCouponDiscount';
import calculateDeliveryPrice from '../utils/calculateDeliveryPrice';

const useCoupons = () => {
  const { checkedCartIds } = useCheckCartIdsContext();
  const { cartItems } = useCartItemsContext();
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
    () => selectedCartItems.reduce((m, i) => Math.max(m, i.quantity), 0),
    [selectedCartItems]
  );
  const currentHour = new Date().getHours();

  const validCoupons = useMemo(() => {
    const now = new Date();
    return coupons.filter((c) => {
      if (c.expirationDate) {
        const expire = new Date(c.expirationDate + 'T23:59:59');

        if (now > expire) {
          return false;
        }
      }

      switch (c.code) {
        case 'FIXED5000':
          return orderPrice >= (c.minimumAmount ?? 0);

        case 'BOGO':
          return maxQuantity >= (c.buyQuantity ?? 0) + (c.getQuantity ?? 0);

        case 'FREESHIPPING':
          return orderPrice >= (c.minimumAmount ?? 0);

        case 'MIRACLESALE': {
          const { start = '00:00:00', end = '00:00:00' } =
            c.availableTime ?? {};
          const startHour = parseInt(start.slice(0, 2), 10);
          const endHour = parseInt(end.slice(0, 2), 10);
          return currentHour >= startHour && currentHour < endHour;
        }

        default:
          return false;
      }
    });
  }, [coupons, orderPrice, maxQuantity, currentHour]);

  const deliveryPrice = calculateDeliveryPrice(orderPrice);

  const couponDiscount = calculateCouponDiscount({
    coupons: selectedCoupons,
    checkedCartItems: selectedCartItems,
    orderPrice,
    deliveryPrice,
  });

  const selectCoupon = (id: number) => {
    setSelectedCoupons((prev) => {
      if (prev.some((c) => c.id === id)) return prev;
      if (prev.length >= 2) return prev;

      const coupon = validCoupons.find((c) => c.id === id);
      return coupon ? [...prev, coupon] : prev;
    });
  };

  const deselectCoupon = (id: number) => {
    setSelectedCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    coupons,
    validCoupons,
    selectedCoupons,
    selectCoupon,
    deselectCoupon,
    couponDiscount,
  };
};

export default useCoupons;
