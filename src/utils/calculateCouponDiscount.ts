import { CartItem, Coupon } from '../types';

type CalculateCouponDiscountParams = {
  coupons: Coupon[]; // 유효성 필터된 쿠폰만 전달
  checkedCartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
};

const calculateCouponDiscount = ({
  coupons,
  checkedCartItems,
  orderPrice,
  deliveryPrice,
}: CalculateCouponDiscountParams): number => {
  if (!coupons || coupons.length === 0) return 0;

  // 단일 순서로 쿠폰을 적용해 할인액 계산
  const applySequence = (sequence: Coupon[]): number => {
    const { totalDiscount } = sequence.reduce(
      (state, coupon) => {
        const { remainingPrice, remainingDelivery, totalDiscount } = state;

        switch (coupon.discountType) {
          case 'fixed': {
            const discount = coupon.discount ?? 0;
            return {
              ...state,
              remainingPrice: remainingPrice - discount,
              totalDiscount: totalDiscount + discount,
            };
          }

          case 'percentage': {
            const rate = (coupon.discount ?? 0) / 100;
            const discount = Math.floor(remainingPrice * rate);
            return {
              ...state,
              remainingPrice: remainingPrice - discount,
              totalDiscount: totalDiscount + discount,
            };
          }

          case 'buyXgetY': {
            const buyQ = coupon.buyQuantity ?? 0;
            const getQ = coupon.getQuantity ?? 0;
            const threshold = buyQ + getQ;

            const eligible = checkedCartItems
              .map((item) => ({
                item,
                freeCount: Math.floor(item.quantity / threshold) * getQ,
              }))
              .filter((x) => x.freeCount > 0);

            if (eligible.length === 0) return state;

            const best = eligible.reduce((prev, curr) => {
              const prevDisc = prev.freeCount * prev.item.product.price;
              const currDisc = curr.freeCount * curr.item.product.price;
              return currDisc > prevDisc ? curr : prev;
            });

            const discount = best.freeCount * best.item.product.price;
            return {
              ...state,
              remainingPrice: remainingPrice - discount,
              totalDiscount: totalDiscount + discount,
            };
          }

          case 'freeShipping': {
            return {
              ...state,
              remainingDelivery: 0,
              totalDiscount: totalDiscount + remainingDelivery,
            };
          }

          default:
            return state;
        }
      },
      {
        remainingPrice: orderPrice,
        remainingDelivery: deliveryPrice,
        totalDiscount: 0,
      }
    );

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
