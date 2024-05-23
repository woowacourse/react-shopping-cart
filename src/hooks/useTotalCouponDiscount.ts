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

  const coupon1 = coupons[0] || null;
  const coupon2 = coupons[1] || null;

  const coupon1Discount = useCouponDiscount({
    coupon: coupon1,
    date,
    orderPrice,
  });

  const coupon2Discount = useCouponDiscount({
    coupon: coupon2,
    date,
    orderPrice,
  });

  const discountAB =
    coupon1Discount +
    useCouponDiscount({
      coupon: coupon2,
      date,
      orderPrice: orderPrice - coupon1Discount,
    });

  const discountBA =
    coupon2Discount +
    useCouponDiscount({
      coupon: coupon1,
      date,
      orderPrice: orderPrice - coupon2Discount,
    });

  return Math.max(discountAB, discountBA);
};

export default useTotalCouponDiscount;
