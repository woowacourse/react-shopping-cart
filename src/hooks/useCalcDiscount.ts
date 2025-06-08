import {ChangeEvent, useEffect, useState} from 'react';
import {CouponCode, CouponType} from '../type/coupon';
import {useShowError} from '../provider/errorProvider';
import {getCoupons} from '../api/coupon/getCoupon';
import {useSelectedItems} from '../provider/cartItemsProvider';
import {
  discountByBOGO,
  discountByFIXED5000,
  discountByMIRACLESALE,
} from '../feature/calcCouponPrice';

export const useCalcDiscount = () => {
  const selectedItems = useSelectedItems();
  const [isCouponChecked, setIsCouponChecked] = useState<
    Record<CouponCode, boolean>
  >({
    FIXED5000: false,
    BOGO: false,
    FREESHIPPING: false,
    MIRACLESALE: false,
  });
  const showError = useShowError();
  const [coupons, setCoupons] = useState<CouponType[]>();

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

  const calcDiscount = (orderPrice: number) => {
    let discountResult = orderPrice;
    const checkedCoupons = Object.keys(isCouponChecked).filter(
      (key) => isCouponChecked[key as keyof typeof isCouponChecked]
    );

    // 30%할인, 2+1 할인 쿠폰 적용되어 있을 때
    if (
      checkedCoupons.includes('MIRACLESALE') &&
      checkedCoupons.includes('BOGO')
    ) {
      return Math.min(
        discountByBOGO(discountByMIRACLESALE(discountResult), selectedItems),
        discountByMIRACLESALE(discountByBOGO(discountResult, selectedItems))
      );
    }

    if (checkedCoupons.includes('MIRACLESALE'))
      discountResult = discountByMIRACLESALE(discountResult);

    if (checkedCoupons.includes('BOGO'))
      discountResult = discountByBOGO(discountResult, selectedItems);

    if (checkedCoupons.includes('FIXED5000'))
      discountResult = discountByFIXED5000(discountResult);

    return discountResult;
  };

  return {isCouponChecked, coupons, handleCouponsChecked, calcDiscount};
};
