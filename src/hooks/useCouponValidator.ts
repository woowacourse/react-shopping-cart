import { Coupon } from '@/types/coupon.type';
import { couponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  date: Date;
}

const useCouponValidator = ({ coupon, date }: Props) => {
  const { id, expirationDate } = coupon;
  const couponList = useRecoilValue(couponListState);

  const isExist = couponList.find((coupon) => coupon.id === id);
  if (isExist === undefined) return false;

  return new Date(expirationDate) > date;
};

export default useCouponValidator;
