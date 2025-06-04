import { useCallback, useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";

export interface CouponApplied {
  coupon: Coupon;
  discountItem: number; // 상품 가격에서 깎인 금액
  discountShipping: number; // 배송비에서 깎인 금액
}

export interface CouponDiscountResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
}

interface Props {
  selectedCoupons: Coupon[] | undefined; // 선택된 쿠폰들
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean; // 제주·도서산간 여부 (추가 배송비 3,000원)
}

const useCouponDiscount = ({
  selectedCoupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponDiscountResult => {
  /* 1. 주문 총액 */
  const orderTotal = useMemo(
    () =>
      selectedShoppingCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [selectedShoppingCartItems]
  );

  /* 2. (쿠폰 유효성 필터링) */

  const seekMostExpensiveBOGOItem = useCallback(
    (buyQty: number): CartItem | null => {
      // buyQty 이상인 아이템만 필터링
      const eligibleItems = selectedShoppingCartItems.filter(
        (item) => item.quantity >= buyQty
      );

      // 빈 배열인 경우 null 반환
      if (eligibleItems.length === 0) {
        return null;
      }

      // 가격 비교를 통해 가장 비싼 아이템 객체를 반환
      return eligibleItems.reduce((prev, curr) =>
        curr.product.price > prev.product.price ? curr : prev
      );
    },
    [selectedShoppingCartItems]
  );

  /* 4. 쿠폰별 할인 계산 + 큰 할인순 정렬 */
  const applyingCoupons = useMemo(() => {
    const baseShipping = getBaseShipping(orderTotal, isIsland);

    const list = [...selectedCoupons].map((coupon) => {
      let item = 0,
        shippingFee = 0;

      switch (coupon.discountType) {
        case "fixed":
          item = coupon.discount ?? 0;
          break;

        case "freeShipping":
          shippingFee = baseShipping;
          break;

        case "percentage":
          item = (orderTotal * (coupon.discount ?? 0)) / 100;
          break;

        case "buyXgetY": {
          const buyQty = coupon.buyQuantity ?? 0;
          const getQty = coupon.getQuantity ?? 0;
          if (buyQty <= 0 || getQty <= 0) {
            item = 0;
            break;
          }

          const maxItem = seekMostExpensiveBOGOItem(buyQty);
          if (!maxItem) {
            item = 0;
            break;
          }

          const groupSize = buyQty + getQty;
          const freeCount = Math.floor(maxItem.quantity / groupSize) * getQty;
          // **여기에서 discountItem 대신 item에 할당해야 합니다**
          item = maxItem.product.price * freeCount;
          console.log(
            `BOGO 할인 적용: ${maxItem.product.name} - ${freeCount}개 무료`
          );
          break;
        }

        default:
          console.warn(`Unknown coupon type: ${coupon.discountType}`);
          break;
      }

      return {
        coupon,
        discountItem: item,
        discountShipping: shippingFee,
      };
    });

    return list;
  }, [selectedCoupons, orderTotal, isIsland, seekMostExpensiveBOGOItem]);

  /* 5. 할인 합계와 배송비 ― 분리해서 계산 */
  const { itemDiscount, shipDiscount } = useMemo(() => {
    let itemDiscount = 0,
      shipDiscount = 0;
    applyingCoupons.forEach((coupon) => {
      itemDiscount += coupon.discountItem;
      shipDiscount += coupon.discountShipping;
    });
    return { itemDiscount, shipDiscount };
  }, [applyingCoupons]);

  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - shipDiscount);

  /* 6. 최종 금액 */
  const discountTotal = itemDiscount + shipDiscount;
  const finalTotal = orderTotal + shippingFee - itemDiscount;

  return {
    orderTotal,
    shippingFee,
    discountTotal,
    finalTotal,
  };
};
export { useCouponDiscount };
