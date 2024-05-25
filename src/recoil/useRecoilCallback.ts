import { useRecoilCallback } from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  shippingInformationState,
} from './atoms';
import isCouponApplicable from '../validate/validateCoupon';
import { totalAmountSelector } from './selectors';
import { removeLocalStorage } from '../utils/LocalStorage';
import { fetchCouponsSelector, fetchItemsSelector } from './fetchSelectors';

export const ResetAllCoupons = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const coupons = await snapshot.getPromise(couponsState);
        coupons.forEach((coupon) => {
          set(couponDetailState(coupon.id), false);
        });
      },
    [],
  );
};

export const ResetAllState = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const items = await snapshot.getPromise(fetchItemsSelector);
        console.log(items);
        items.forEach((item) => {
          set(itemDetailsState(item.id), {
            quantity: item ? item.quantity : 1,
            isChecked: true,
          });
        });

        const coupons = await snapshot.getPromise(fetchCouponsSelector);
        coupons.forEach((coupon) => {
          set(couponDetailState(coupon.id), false);
        });
        set(shippingInformationState, false);
        removeLocalStorage();
      },
    [],
  )();
};
export const useValidateCoupons = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const coupons = await snapshot.getPromise(couponsState);
        const totalAmount = await snapshot.getPromise(totalAmountSelector);
        coupons.forEach(async (coupon) => {
          const couponDetail = await snapshot.getPromise(
            couponDetailState(coupon.id),
          );
          set(
            couponDetailState(coupon.id),
            couponDetail && isCouponApplicable(coupon, totalAmount),
          );
        });
      },
    [],
  );
};
