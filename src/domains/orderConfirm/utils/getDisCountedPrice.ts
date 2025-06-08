import { CouponCode } from "../types/coupon";

// ================== 계산 관련 인터페이스 ==================

interface getDisCountedPriceProps {
  deliveryFee: number;
  orderPrice: number;
  maxPriceInSelectedCart: number;
  selectedCoupons: CouponCode[];
}

interface couponCalculatorProps {
  deliveryFee: number;
  orderPrice: number;
  maxPriceInSelectedCart: number;
  code: CouponCode;
}

// ================== 할인된 가격 계산 관련 함수 ==================

/**
 * 주어진 장바구니 아이템들 중에서 선택된 아이템들의 최대 가격을 계산합니다.
 * @param {number} props.deliveryFee - 배송비
 * @param {number} props.orderPrice - 총 결제 금액
 * @param {number} props.maxPriceInSelectedCart - 선택된 장바구니 아이템들 중 최대 가격
 * @param {CouponCode[]} props.selectedCoupons - 선택된 쿠폰 코드 배열
 * @returns {number} - 선택된 아이템들 중 최대 가격
 */

export function getDisCountedPrice(props: getDisCountedPriceProps) {
  if (props.selectedCoupons.length === 0) return 0;
  if (props.selectedCoupons.length === 1) return getTotalDiscount([0], props);

  const firstDiscount = getTotalDiscount([0, 1], props);
  const secondDiscount = getTotalDiscount([1, 0], props);

  return Math.max(firstDiscount, secondDiscount);
}

// ================== 할인 금액 계산 함수 ==================

/**
 * 주어진 인덱스 배열에 따라 할인 금액을 계산합니다.
 * @param {number[]} index - 할인 코드 인덱스 배열
 * @param {getDisCountedPriceProps} props - 할인 계산에 필요한 속성들
 * @returns {number} - 총 할인 금액
 */

function getTotalDiscount(index: number[], props: getDisCountedPriceProps) {
  const firstDiscount = couponCalculator({
    ...props,
    code: props.selectedCoupons[index[0]],
  });

  if (index.length === 1) return firstDiscount;

  const secondDiscount = couponCalculator({
    ...props,
    orderPrice: props.orderPrice - firstDiscount,
    code: props.selectedCoupons[index[1]],
  });

  return firstDiscount + secondDiscount;
}

// ================== 쿠폰 계산 함수 ==================

/**
 * 주어진 쿠폰 코드에 따라 할인 금액을 계산합니다.
 * @param {number} deliveryFee - 배송비
 * @param {number} orderPrice - 총 결제 금액
 * @param {number} maxPriceInSelectedCart - 선택된 장바구니 아이템들 중 최대 가격
 * @param {CouponCode} code - 쿠폰 코드
 * @returns {number} - 쿠폰에 따른 할인 금액
 */

function couponCalculator({
  deliveryFee,
  orderPrice,
  maxPriceInSelectedCart,
  code,
}: couponCalculatorProps) {
  switch (code) {
    case "FIXED5000":
      return 5_000;
    case "BOGO":
      return maxPriceInSelectedCart;
    case "FREESHIPPING":
      return deliveryFee;
    case "MIRACLESALE":
      return orderPrice * 0.3;
    default:
      return 0;
  }
}
