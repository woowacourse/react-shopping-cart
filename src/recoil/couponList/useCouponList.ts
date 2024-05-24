import { useRecoilState, useRecoilValue } from 'recoil';
import { couponListState } from './couponListState';
import { isValidCoupon } from '../../utils/coupon/isValidCoupon';
import { Coupon } from '../../types/coupon.type';
import { totalCartPriceState } from '../price/totalCartPriceState';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';
import { isApplicableCoupon } from '../../utils/coupon/isApplcableCoupon';
import { useEffect } from 'react';

const useCouponList = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);
  const totalCartPrice = useRecoilValue(totalCartPriceState);
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);

  useEffect(() => {
    getCouponListSortedByDisabled();
  }, []);

  const getCouponListSortedByDisabled = () => {
    const validCouponList = couponList.filter((coupon) => isValidCoupon(coupon));

    const couponListSortedByDisabled = addDisabledProperty(validCouponList).sort((a, b) => {
      if (a.isApplicable === b.isApplicable) return 0;

      return a.isApplicable === true ? -1 : 1;
    });

    setCouponList(couponListSortedByDisabled);
  };

  const addDisabledProperty = (couponList: Coupon[]) => {
    return couponList.map((coupon) => ({
      ...coupon,
      isApplicable: isApplicableCoupon({ coupon, totalCartPrice, selectedCartItemList }),
    }));
  };

  return { couponList };
};

export default useCouponList;
