import { Coupon } from "@/apis/coupon/coupon.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { createCouponDisabledChecker } from "../utils/createCouponDisabledChecker";
import { getIsCouponDisabled } from "../utils/getCouponDisabled";
import { getBestCouponCombination } from "../utils/getBestCouponCombination";
import { MAX_SELECTED_COUPON_COUNT } from "@/domains/constants/coupon";
import { getAvailableCoupons } from "../utils/getAvailableCoupons";
import { getTotalCouponDiscountAmount } from "../utils/getTotalCouponDiscountAmount";

type UseCouponPrams = {
  orderList: CartItemType[];
  couponList: Coupon[];
  deliveryPrice: number;
};

/**
 * 쿠폰 선택 및 할인 금액 계산을 관리하는 커스텀 훅
 *
 * @param {Object} params - 쿠폰 관리 파라미터
 * @param {CartItemType[]} params.orderList - 주문 상품 목록
 * @param {Coupon[]} params.couponList - 쿠폰 목록
 * @param {number} params.deliveryPrice - 배송비(배송비 무료 쿠폰에 사용, 배송비에 따라 쿠폰 할인 금액이 달라짐)
 *
 * @returns {{
 *   getIsSelectedId: (id: number) => boolean,
 *   toggleSelectedId: (id: number) => void,
 *   getIsCouponIdDisabled: (id: number) => boolean,
 *   discountAmount: number
 * }}
 * @property {function} getIsSelectedId - 특정 쿠폰 선택 여부 확인 함수
 * @property {function} toggleSelectedId - 쿠폰 선택 상태 토글 함수
 * @property {function} getIsCouponIdDisabled - 쿠폰 사용 불가 여부 확인 함수
 * @property {number} discountAmount - 총 할인 금액(실제 적용된 할인 금액이 아닌 선택된 쿠폰의 할인 금액 합계)
 */
export const useCoupon = ({
  orderList,
  couponList,
  deliveryPrice,
}: UseCouponPrams) => {
  const availableCoupons = getAvailableCoupons(couponList, orderList);

  const bestCombo = getBestCouponCombination({
    availableCoupons,
    orderList,
    deliveryPrice,
    couponCount: MAX_SELECTED_COUPON_COUNT,
  });
  const { getIsSelectedId, toggleSelectedId, getSelectedIdsCount } =
    useSelectedIds(new Set(bestCombo.map(({ id }) => id)));

  const getIsCouponIdDisabled = createCouponDisabledChecker({
    notAvailableCoupons: couponList.filter((coupon) =>
      getIsCouponDisabled(coupon, orderList)
    ),
    notSelectedCoupons: couponList.filter(({ id }) => !getIsSelectedId(id)),
    isMaxSelectedCoupon: getSelectedIdsCount() >= MAX_SELECTED_COUPON_COUNT,
  });

  const selectedCoupons = availableCoupons.filter((coupon) =>
    getIsSelectedId(coupon.id)
  );
  const discountAmount = getTotalCouponDiscountAmount({
    couponList: selectedCoupons,
    orderList,
    deliveryPrice,
  });

  return {
    getIsSelectedId,
    toggleSelectedId,
    getIsCouponIdDisabled,
    discountAmount,
  };
};
