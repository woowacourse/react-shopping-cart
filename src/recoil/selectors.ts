import { DefaultValue, selector, selectorFamily } from 'recoil';
import {
  couponDetailState,
  couponsState,
  itemDetailsState,
  itemsState,
  shippingInformationState,
} from './atoms';
import { CartItems } from '../types/Item';
import { updateLocalStorage } from '../utils/LocalStorage';
import {
  ADDITIONAL_SHIPPING_FEE,
  DEFAULT_SHIPPING_FEE,
  FREE_DELIVERY_THRESHOLD,
} from '../constants/ShoppingCart';
import { Coupon } from '../types/coupon';
import {
  calculateBuyXgetYDiscount,
  calculateFixedDiscount,
  calculatePercentageDiscount,
} from '../utils/Calculate';

type Type = 'Default' | 'Discount';
/**
 * 'Default' : 전체 금액, 배송비 계산, 총 결제 금액 계산
 * 'Discount' : 전체 금액, 배송비 계산, 할인 금액 ,총 결제 금액 계산
 */
export const totalPriceSelector = selectorFamily({
  key: 'totalPriceSelector',
  get:
    (type: Type) =>
    ({ get }) => {
      const totalAmount = get(totalAmountSelector);

      if (type === 'Default') {
        const deliveryFee =
          totalAmount >= FREE_DELIVERY_THRESHOLD || totalAmount === 0
            ? 0
            : DEFAULT_SHIPPING_FEE;

        const calculatedTotalAmount = totalAmount + deliveryFee;

        return { totalAmount, deliveryFee, calculatedTotalAmount };
      }
      const { totalDiscount, isFreeShipping } = get(totalDiscountSelector);
      const deliveryFee =
        totalAmount >= FREE_DELIVERY_THRESHOLD ||
        totalAmount === 0 ||
        isFreeShipping
          ? 0
          : get(shippingInformationState) === true
          ? ADDITIONAL_SHIPPING_FEE
          : DEFAULT_SHIPPING_FEE;

      const calculatedTotalAmount = totalAmount + deliveryFee - totalDiscount;
      return {
        totalAmount,
        deliveryFee,
        totalDiscount,
        calculatedTotalAmount,
      };
    },
});

/**
 * 전체 상품 금액 계산
 */
export const totalAmountSelector = selector<number>({
  key: 'totalAmountSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    return productIds.reduce((prevTotalAmount, { id, product }) => {
      const { quantity, isChecked } = get(itemDetailsState(id));

      return isChecked
        ? prevTotalAmount + product.price * quantity
        : prevTotalAmount;
    }, 0);
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

/**
 * 선택된 모든 쿠폰을 배열로 반환하는 함수
 */
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

/**
 * 무료 배송 쿠폰을 선택했는지 확인 선택했으면 true
 */
export const checkShippingFreeSelector = selector({
  key: 'checkShippingFreeSelector',
  get: ({ get }) => {
    const checkedCoupons = get(allCheckedCouponsSelector);
    return checkedCoupons.some(
      (checkedCoupon) => checkedCoupon.discountType === 'freeShipping',
    );
  },
});

/**
 * 전체 할인 금액을 반환하는 함수
 */
export const totalDiscountSelector = selector({
  key: 'totalDiscountSelector',
  get: ({ get }) => {
    const checkedCoupons = get(allCheckedCouponsSelector);
    const totalAmount = get(totalAmountSelector);
    const itemPriceAndQuantity = get(checkedItemsSelector);
    let isFreeShipping = false;
    const totalDiscount = checkedCoupons.reduce(
      (prevTotalDiscount, checkedCoupon) => {
        switch (checkedCoupon.discountType) {
          case 'fixed':
            return prevTotalDiscount + calculateFixedDiscount(checkedCoupon);
          case 'percentage':
            return (
              prevTotalDiscount +
              calculatePercentageDiscount(checkedCoupon, totalAmount)
            );
          case 'buyXgetY':
            if (checkedCoupon.buyQuantity && checkedCoupon.getQuantity) {
              return (
                (prevTotalDiscount +
                  calculateBuyXgetYDiscount(
                    checkedCoupon.buyQuantity,
                    itemPriceAndQuantity,
                  )) *
                checkedCoupon.getQuantity
              );
            }
            return prevTotalDiscount;
          case 'freeShipping':
            isFreeShipping = true;
            return prevTotalDiscount + 0;
          default:
            return prevTotalDiscount + 0;
        }
      },
      0,
    );
    return { totalDiscount, isFreeShipping };
  },
});
