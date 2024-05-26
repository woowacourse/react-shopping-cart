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

/**
 * 전체 쿠폰의 선택 여부를 초기 상태(false)로 만드는 함수
 */
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

/**
 * 모든 atomFamily과 shippingInformationState를 초기화 해주는 함수
 */
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

/**
 * 각 상품에의 수량과 가격에 따라 쿠펀 적용 여부를 검사하여 선택 가능 여부를 판별,
 * 선택 가능하고 이전에 선택되었던 쿠포은 true로 설정
 */
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
