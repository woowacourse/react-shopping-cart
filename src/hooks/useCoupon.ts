import { useRecoilState, useRecoilValue } from 'recoil';
import {
  calculateOrderPrice,
  checkedCartItems,
  fetchCouponList,
} from '../recoil/selectors';
import findCouponValidator from '../domain/findCouponValidator';
import findApplicableCoupons from '../domain/findApplicableCoupons';
import discountCalculator from '../domain/discountCalculator';
import { useEffect } from 'react';
import {
  applicableCouponList,
  applyCouponList,
  discountPrice,
} from '../recoil/atoms';

const useCoupon = () => {
  const couponList = useRecoilValue(fetchCouponList);
  const orderList = useRecoilValue(checkedCartItems);
  const { totalOrderPrice, deliveryFee, totalPrice } =
    useRecoilValue(calculateOrderPrice);

  const { validCoupon } = findCouponValidator(couponList);

  const [applicableCoupons, setApplicableCoupons] =
    useRecoilState(applicableCouponList);
  const [applyCoupons, setApplyCoupons] = useRecoilState(applyCouponList);
  const [finalDiscountPrice, setFinalDiscountPrice] =
    useRecoilState(discountPrice);

  useEffect(() => {
    const validCoupons = validCoupon();
    const newApplicableCoupons = findApplicableCoupons({
      validCouponList: validCoupons,
      totalOrderPrice,
      orderList,
    }).applicableCoupons();

    // 상태가 변경될 때만 업데이트
    if (
      JSON.stringify(applicableCoupons) !== JSON.stringify(newApplicableCoupons)
    ) {
      setApplicableCoupons(newApplicableCoupons);
    }
  }, [
    couponList,
    totalOrderPrice,
    orderList,
    validCoupon,
    setApplicableCoupons,
    applicableCoupons,
  ]);

  const findBestCouponCombination = () => {
    let bestCombination: { coupons: Coupon[]; totalDiscount: number } = {
      coupons: [],
      totalDiscount: 0,
    };

    for (let i = 0; i < applicableCoupons.length; i++) {
      for (let j = i; j < applicableCoupons.length; j++) {
        const firstCoupon = applicableCoupons[i];
        const secondCoupon = applicableCoupons[j];

        const discount1 = discountCalculator({
          coupon: firstCoupon,
          totalPrice,
          orderList,
          deliveryFee,
        }).calculateDiscountAmount();

        const discount2 = discountCalculator({
          coupon: secondCoupon,
          totalPrice,
          orderList,
          deliveryFee,
        }).calculateDiscountAmount();

        const totalDiscount =
          firstCoupon === secondCoupon ? discount1! : discount1! + discount2!;

        if (totalDiscount > bestCombination.totalDiscount) {
          if (firstCoupon === secondCoupon && applicableCoupons.length === 1) {
            bestCombination = {
              coupons: [firstCoupon],
              totalDiscount: discount1!,
            };
          } else if (firstCoupon === secondCoupon) {
            continue;
          } else {
            bestCombination = {
              coupons: [firstCoupon, secondCoupon],
              totalDiscount,
            };
          }
        }
      }
    }

    return bestCombination;
  };

  useEffect(() => {
    const bestCombination = findBestCouponCombination();

    // 상태가 변경될 때만 업데이트
    if (
      JSON.stringify(applyCoupons) !==
        JSON.stringify(bestCombination.coupons) ||
      finalDiscountPrice !== bestCombination.totalDiscount
    ) {
      setApplyCoupons(bestCombination.coupons);
      setFinalDiscountPrice(bestCombination.totalDiscount);
    }
  }, [
    applicableCoupons,
    totalPrice,
    orderList,
    deliveryFee,
    setFinalDiscountPrice,
  ]);
};

export default useCoupon;
