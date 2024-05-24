import { Coupon } from '@/types/coupon.type';
import { selectedCouponListState } from '@/store/atoms';
import useCouponAvailable from './useCouponAvailable';
import useCouponValidator from './useCouponValidator';
import { useRecoilValue } from 'recoil';

interface Props {
  coupon: Coupon;
}

const useCanUseCoupon = ({ coupon }: Props) => {
  const date = new Date();
  const selectedCoupon = useRecoilValue(selectedCouponListState);
  const isSelected = selectedCoupon.some((item) => item.id === coupon.id);

  const isValid = useCouponValidator({ coupon, date });
  const isAvailable = useCouponAvailable({ coupon, date });

  if (selectedCoupon.length >= 2 && !isSelected) {
    return false;
  }

  return isValid && isAvailable;
};

export default useCanUseCoupon;
