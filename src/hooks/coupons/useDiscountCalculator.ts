// 쿠폰별 할인 금액 계산하는 커스텀 훅
import { useRecoilValue } from "recoil";
import { cartItemsState } from "@/stores/cartItems";
import { cartAmountState, shippingAreaState } from "@/stores/cartAmount";

import { CART_PRICE } from "@/constants/cart";
import { Coupon } from "@/types/coupon";

const useDiscountCalculator = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const shippingArea = useRecoilValue(shippingAreaState);
  const { orderAmount } = useRecoilValue(cartAmountState);

  const calculateFixedDiscount = (discount: number) => {
    return discount;
  };

  const calculatePercentageDiscount = (discount: number) => {
    return orderAmount * discount;
  };

  // 3개 이상인 것 중 단가가 가장 비싼 품목에 적용 : 가격 (해당 상품 수량 - 1)
  // TODO: 3 상수화
  const calculateBuyXgetYDiscount = () => {
    const filteredItemsByQuantity = cartItems.filter(
      (cartItem) => cartItem.quantity >= 3
    );

    if (filteredItemsByQuantity.length === 0) {
      return 0;
    }

    const maxUnitPrice = Math.max(
      ...filteredItemsByQuantity.map((cartItem) => cartItem.product.price)
    );

    return maxUnitPrice;
  };

  const calculateFreeShippingDiscount = () => {
    return CART_PRICE.shippingFees[shippingArea];
  };

  const calculateDiscountAmount = (coupon: Coupon) => {
    const { discountType, discount } = coupon;

    if (!discount && !discountType) {
      return 0;
    }

    switch (discountType) {
      case "fixed":
        return calculateFixedDiscount(discount as number);
      case "percentage":
        return calculatePercentageDiscount(discount as number);
      case "buyXgetY":
        return calculateBuyXgetYDiscount();
      case "freeShipping":
        return calculateFreeShippingDiscount();
      default:
        return 0;
    }
  };

  return { calculateDiscountAmount };
};

export default useDiscountCalculator;
