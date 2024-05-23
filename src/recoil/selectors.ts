import { DefaultValue, selector, useRecoilCallback } from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  itemsState,
} from './atoms';
import { CartItems, ItemPriceAndQuantity } from '../types/Item';
import { updateLocalStorage } from '../utils/UpdateLocalStorage';
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
} from '../constants/ShoppingCart';
import { Coupon } from '../types/coupon';
import {
  calculateBuyXgetYDiscount,
  calculateFixedDiscount,
  calculatePercentageDiscount,
} from '../utils/Calculate';
import isCouponApplicable from '../validate/validateCoupon';
/**
 * 전체 금액, 배송비 계산, 총 결제 금액 계산
 */

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const totalAmount = productIds.reduce(
      (prevTotalAmount, { id, product }) => {
        const { quantity, isChecked } = get(itemDetailsState(id));

        return isChecked
          ? prevTotalAmount + product.price * quantity
          : prevTotalAmount;
      },
      0,
    );
    const deliveryFee =
      totalAmount >= FREE_DELIVERY_THRESHOLD || totalAmount === 0
        ? 0
        : DELIVERY_FEE;
    const calculatedTotalAmount = totalAmount + deliveryFee;
    return { totalAmount, deliveryFee, calculatedTotalAmount };
  },
});

/**
 * get: () => boolean
 * set: (newValue: 변경할 boolean 값) => void
 * 전체 선택 체크 시 모든 itemDetailsState의 isChecked 변경,
 * LocalStorage 업데이트
 */
export const toggleAllSelector = selector<boolean>({
  key: 'toggleAllSelector',
  get: ({ get }): boolean => {
    const items: CartItems[] = get(itemsState);
    return items.every((item) => get(itemDetailsState(item.id)).isChecked);
  },
  set: ({ get, set }, newValue: boolean | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const items: CartItems[] = get(itemsState);
    items.forEach((item) => {
      set(itemDetailsState(item.id), (prev) => ({
        ...prev,
        isChecked: newValue,
      }));
      updateLocalStorage({ id: item.id, isChecked: newValue });
    });
  },
});

/**
 * 모든 itemDetailsState를 순회하며 총 수량 계산
 */
export const totalCountSelector = selector({
  key: 'totalCountSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const totalItemTypeCount = productIds.length;

    const totalCount = productIds.reduce((prevTotalCount, itemsState) => {
      const { quantity, isChecked } = get(itemDetailsState(itemsState.id));
      if (isChecked) {
        return prevTotalCount + quantity;
      }
      return prevTotalCount;
    }, 0);
    return { totalItemTypeCount, totalCount };
  },
});

/**
 * 선택된 모든 item을 배열로 반환하는 함수
 */
export const checkedItemsSelector = selector({
  key: 'checkedItemsSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    const checkedItem = productIds.reduce<CartItems[]>((prev, item) => {
      const temp = get(itemDetailsState(item.id));
      if (temp.isChecked) {
        prev.push({
          ...item,
          quantity: temp.quantity,
        });
      }
      return prev;
    }, []);
    return checkedItem;
  },
});

export const allCheckedCouponsSelector = selector({
  key: 'allCheckedCouponsSelector',
  get: ({ get }) => {
    const coupons = get(couponsState);
    return coupons.reduce<Coupon[]>((prevCheckedCoupons, coupon) => {
      if (get(couponDetailState(coupon.id))) {
        prevCheckedCoupons.push(coupon);
      }
      return prevCheckedCoupons;
    }, []);
  },
});

export const allCheckedItemsSelector = selector({
  key: 'allCheckedItemsSelector',
  get: ({ get }) => {
    const coupons = get(itemsState);
    return coupons.reduce<ItemPriceAndQuantity[]>((prevCheckedItems, item) => {
      const itemDetail = get(itemDetailsState(item.id));
      if (itemDetail.isChecked) {
        prevCheckedItems.push({
          price: item.product.price,
          quantity: itemDetail.quantity,
        });
      }
      return prevCheckedItems;
    }, []);
  },
});

export const useResetAllCoupons = () => {
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

export const useValidateCoupons = () => {
  return useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const coupons = await snapshot.getPromise(couponsState);
        const { totalAmount } = await snapshot.getPromise(totalPriceSelector);
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

export const totalDiscountSelector = selector({
  key: 'totalDiscountSelector',
  get: ({ get }) => {
    const checkedCoupons = get(allCheckedCouponsSelector);
    const { totalAmount } = get(totalPriceSelector);
    const itemPriceAndQuantity = get(allCheckedItemsSelector);

    return checkedCoupons.reduce((prevTotalDiscount, checkedCoupon) => {
      switch (checkedCoupon.discountType) {
        case 'fixed':
          return prevTotalDiscount + calculateFixedDiscount(checkedCoupon);
        case 'percentage':
          return (
            prevTotalDiscount +
            calculatePercentageDiscount(checkedCoupon, totalAmount)
          );
        case 'buyXgetY':
          return (
            prevTotalDiscount + calculateBuyXgetYDiscount(itemPriceAndQuantity)
          );
        default:
          return prevTotalDiscount + 0;
      }
    }, 0);
  },
});
