import { useRecoilValue } from 'recoil';
import { couponStatusState, mockCoupons } from './../store/atoms';
import { totalOrderAmountState } from '../store/selectors';
import { CouponType } from '../types';

const findCouponByCode = (code: string) => {
  const couponData = mockCoupons;
  return couponData.find((coupon) => coupon.code === code) as CouponType;
};

const validateExpiration = (expirationDate: string) => {
  const today = new Date();
  const couponExpirationDate = new Date(expirationDate);

  return today < couponExpirationDate;
};

const isOverMinOrderAmountCoupon = (orderAmount: number, coupon: CouponType) => {
  if (validateExpiration(coupon.expirationDate) === false) return false;
  if (!coupon.minimumAmount) return false;
  if (orderAmount < coupon.minimumAmount) return false;
  return true;
};

const useUpdateCouponStatus = () => {
  const couponStatus = useRecoilValue(couponStatusState);
  const { orderAmount } = useRecoilValue(totalOrderAmountState);

  const updateCouponStatus = () => {
    const isAvailableFIXED5000 = isOverMinOrderAmountCoupon(
      orderAmount,
      findCouponByCode('FIXED5000'),
    );

    const newCouponStatus = {
      ...couponStatus,
      ['FIXED5000']: {
        checked: false,
        isAvailable: isAvailableFIXED5000,
      },
    };

    return newCouponStatus;
  };
  return { updateCouponStatus };
};

export default useUpdateCouponStatus;
