import { Coupon } from '@/types/coupon.type';
import { MAXIMUM_SELECT_COUPON_COUNT } from '@/constants/system';
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

  if (selectedCoupon.length >= MAXIMUM_SELECT_COUPON_COUNT && !isSelected) {
    return false;
  }

  return isValid && isAvailable;
};

export default useCanUseCoupon;
