import { Coupon } from '@/types/coupon.type';

interface Props {
  coupon: Coupon;
  date: Date;
}

const couponValidator = ({ coupon, date }: Props) => {
  if (!coupon.expirationDate || new Date(coupon.expirationDate) > date)
    return true;

  return false;
};

export default couponValidator;
