import {ChangeEvent, useEffect, useState} from 'react';
import {CouponCode, CouponKey, CouponType} from '../type/coupon';
import {useShowError} from '../provider/errorProvider';
import {getCoupons} from '../api/coupon/getCoupon';
import {codeToCouponKey} from '../constant/coupons';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<CouponType[]>();
  const [isCouponChecked, setIsCouponChecked] = useState<
    Record<CouponKey, boolean>
  >({
    discount5000: false,
    buy2get1: false,
    freeShipping: false,
    miracleSale: false,
  });
  const showError = useShowError();

  useEffect(() => {
    const getCouponData = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (e) {
        showError('쿠폰 정보를 불러올 수 없습니다.');
      }
    };

    getCouponData();
  }, [showError]);

  const handleCouponsChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const couponKey = codeToCouponKey[e.target.name as CouponCode];
    if (isCouponChecked[couponKey]) {
      setIsCouponChecked((prev) => ({
        ...prev,
        [couponKey]: false,
      }));
      return;
    }

    const filteredCheckedNumber = Object.values(isCouponChecked).filter(
      (v) => v
    ).length;

    if (filteredCheckedNumber === 2) return;
    setIsCouponChecked((prev) => ({
      ...prev,
      [couponKey]: true,
    }));
  };

  return {isCouponChecked, coupons, handleCouponsChecked};
};
