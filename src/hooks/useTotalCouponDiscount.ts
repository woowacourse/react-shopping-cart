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

  const coupon1 = useCouponDiscount({ coupon: coupons[0], date, orderPrice });
  const coupon2 = useCouponDiscount({
    coupon: coupons[1],
    date,
    orderPrice: orderPrice - coupon1,
  });

  const AB = coupon1 + coupon2;

  const coupon3 = useCouponDiscount({ coupon: coupons[1], date, orderPrice });
  const coupon4 = useCouponDiscount({
    coupon: coupons[0],
    date,
    orderPrice: orderPrice - coupon3,
  });

  const BA = coupon3 + coupon4;

  return AB > BA ? AB : BA;
};

export default useTotalCouponDiscount;
