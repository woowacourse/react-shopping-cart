import {ChangeEvent, useEffect, useState} from 'react';
import {CouponCode, CouponType} from '../type/coupon';
import {useShowError} from '../provider/errorProvider';
import {getCoupons} from '../api/coupon/getCoupon';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<CouponType[]>();
  const [isCouponChecked, setIsCouponChecked] = useState<
    Record<CouponCode, boolean>
  >({
    FIXED5000: false,
    BOGO: false,
    FREESHIPPING: false,
    MIRACLESALE: false,
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
    if (isCouponChecked[e.target.name as keyof typeof isCouponChecked]) {
      setIsCouponChecked((prev) => ({
        ...prev,
        [e.target.name]: false,
      }));
      return;
    }

    const filteredCheckedNumber = Object.values(isCouponChecked).filter(
      (v) => v
    ).length;

    if (filteredCheckedNumber === 2) return;
    setIsCouponChecked((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  };

  return {isCouponChecked, coupons, handleCouponsChecked};
};
