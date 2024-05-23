import { Coupon } from '@/types/coupon.type';
import { couponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
  date: Date;
}

const useCouponValidator = ({ coupon, date }: Props) => {
  const couponList = useRecoilValue(couponListState);
  if (coupon === null) return false;

  const { id, expirationDate } = coupon;

  const isExist = couponList.find((item) => item.id === id);
  if (isExist === undefined) return false;

  return new Date(expirationDate) > date;
};

export default useCouponValidator;
