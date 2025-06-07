import { CartItem, Coupon } from '../types';

const calculateCouponDiscount = (
  coupons: Coupon[], // 유효성 필터된 쿠폰만 전달
  CheckedCartItems: CartItem[],
  orderPrice: number,
  deliveryPrice: number
): number => {
  if (!coupons || coupons.length === 0) return 0;

  // 단일 순서로 쿠폰을 적용해 할인액 계산
  const applySequence = (sequence: Coupon[]): number => {
    let remainingPrice = orderPrice;
    let remainingDelivery = deliveryPrice;
    let totalDiscount = 0;

    for (const coupon of sequence) {
      switch (coupon.discountType) {
        case 'fixed': {
          const discount = coupon.discount ?? 0;
          totalDiscount += discount;
          remainingPrice -= discount;
          break;
        }

        case 'percentage': {
          const rate = (coupon.discount ?? 0) / 100;
          const discount = Math.floor(remainingPrice * rate);
          totalDiscount += discount;
          remainingPrice -= discount;
          break;
        }

        case 'buyXgetY': {
          const buyQ = coupon.buyQuantity ?? 0;
          const getQ = coupon.getQuantity ?? 0;
          const threshold = buyQ + getQ;

          const eligible = CheckedCartItems.map((item) => ({
            item,
            freeCount: Math.floor(item.quantity / threshold) * getQ,
          })).filter((x) => x.freeCount > 0);

          if (eligible.length > 0) {
            // 단가가 가장 높은 상품부터 할인 적용
            const best = eligible.reduce((prev, curr) => {
              const prevDisc = prev.freeCount * prev.item.product.price;
              const currDisc = curr.freeCount * curr.item.product.price;
              return currDisc > prevDisc ? curr : prev;
            });

            const discount = best.freeCount * best.item.product.price;
            totalDiscount += discount;
            remainingPrice -= discount;
          }
          break;
        }

        case 'freeShipping': {
          // 남은 배송비 전액 할인
          totalDiscount += remainingDelivery;
          remainingDelivery = 0;
          break;
        }
      }
    }

    return totalDiscount;
  };

  // 쿠폰이 1개인 경우
  if (coupons.length === 1) {
    return applySequence(coupons);
  }

  // 복수 쿠폰 시 모든 순열을 시도해 최대 할인 선택
  let maxDiscount = 0;
  const [c1, c2] = coupons;
  maxDiscount = Math.max(applySequence([c1, c2]), applySequence([c2, c1]));

  return maxDiscount;
};

export default calculateCouponDiscount;
