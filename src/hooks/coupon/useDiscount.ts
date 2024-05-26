import { useRecoilValue, useSetRecoilState } from 'recoil';
import { discountAmountStore, selectedCartItems } from '@recoil/atoms';
import { BuyXGetYCoupon, Coupon, FixedCoupon, PercentageCoupon } from '@type/coupon';
import { CartItem } from '@type/cartItem';
import usePriceInfo from '@hooks/usePriceInfo';
import { IPriceInfo } from '@type/priceInfo';
import { useEffect } from 'react';
import { DISCOUNT_TYPE } from '@constants/constants';

const discountByFixed = (coupon: FixedCoupon) => {
  return coupon.discount as number;
};

const discountByBuyXGetY = (selectedItems: CartItem[], coupon: BuyXGetYCoupon) => {
  // 2개 이상인 상품을 선별해서
  const targetItems = selectedItems.filter(item => item.quantity >= (coupon.buyQuantity as number));

  // 가장 가격이 비싼 상품을 고른다.
  const targetItemsPrice = targetItems.map(item => item.product.price);
  const maxPrice = Math.max(...targetItemsPrice);

  return maxPrice;
};

const discountByFreeShipping = (priceInfo: IPriceInfo, isolatedRegion: boolean) => {
  return priceInfo.shipping === 0 ? 0 : isolatedRegion ? 6000 : 3000;
};

const discountByPercentage = (cartItemsPrice: number, coupon: PercentageCoupon) => {
  return (cartItemsPrice * (coupon.discount as number)) / 100;
};

const useDiscount = (applyingCoupons: Coupon[], isolatedRegion: boolean) => {
  const setDiscountAmount = useSetRecoilState(discountAmountStore);

  const selectedItems = useRecoilValue(selectedCartItems);
  const priceInfo = usePriceInfo(isolatedRegion);

  const discountByCoupon = (selectedItems: CartItem[], coupon: Coupon) => {
    if (coupon.discountType === DISCOUNT_TYPE.fixed) return discountByFixed(coupon as FixedCoupon);
    if (coupon.discountType === DISCOUNT_TYPE.buyXgetY)
      return discountByBuyXGetY(selectedItems, coupon as BuyXGetYCoupon);
    if (coupon.discountType === DISCOUNT_TYPE.freeShipping)
      return discountByFreeShipping(priceInfo, isolatedRegion);
    if (coupon.discountType === DISCOUNT_TYPE.percentage)
      return discountByPercentage(
        selectedItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0),
        coupon as PercentageCoupon,
      );

    return 0;
  };

  const calculateMaximumDiscountAmount = () => {
    // 할인율이 큰 퍼센트를 먼저 적용시키기 위해서
    const percentageApply = applyingCoupons.find(
      coupon => coupon.discountType === DISCOUNT_TYPE.percentage,
    );
    const percentageDiscount = calculatePercentageCoupon(percentageApply);

    // 퍼센트를 제외한 나머지 할인 적용
    const newDiscount = calculateRestCoupon(applyingCoupons);

    // 할인율과 나머지 할인을 계산
    return newDiscount + percentageDiscount;
  };

  const calculatePercentageCoupon = (coupon: Coupon | undefined) => {
    if (coupon?.discountType === DISCOUNT_TYPE.percentage)
      return discountByPercentage(priceInfo.order, coupon as PercentageCoupon);
    else return 0;
  };

  const calculateRestCoupon = (coupons: Coupon[]) => {
    return coupons.reduce((acc, cur) => {
      if (cur.discountType !== DISCOUNT_TYPE.percentage) {
        return acc + discountByCoupon(selectedItems, cur);
      }
      return acc;
    }, 0);
  };

  const discountAmount = calculateMaximumDiscountAmount();

  const handleDiscountAmount = (discount: number) => {
    setDiscountAmount(discount);
  };

  useEffect(() => {
    setDiscountAmount(discountAmount);
  }, [isolatedRegion]);

  return {
    discountAmount,
    handleDiscountAmount,
  };
};

export default useDiscount;
