import { Coupon } from '@/types/coupon.type';
import { recipeState } from '@/store/selectors/recipeSelector';
import useCouponDiscount from './useCouponDiscount';
import { useRecoilValue } from 'recoil';

interface Props {
  coupons: Coupon[];
  date: Date;
}

const useTotalCouponDiscount = ({ coupons, date }: Props) => {
  const { orderPrice } = useRecoilValue(recipeState);

  const coupon1Discount = useCouponDiscount({
    coupon: coupons[0],
    date,
    orderPrice,
  });
  const coupon2Discount = useCouponDiscount({
    coupon: coupons[1],
    date,
    orderPrice,
  });

  const discountAB =
    coupon1Discount +
    useCouponDiscount({
      coupon: coupons[1],
      date,
      orderPrice: orderPrice - coupon1Discount,
    });

  const discountBA =
    coupon2Discount +
    useCouponDiscount({
      coupon: coupons[0],
      date,
      orderPrice: orderPrice - coupon2Discount,
    });

  return Math.max(discountAB, discountBA);
};

export default useTotalCouponDiscount;
