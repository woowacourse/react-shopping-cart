import { useRecoilValue } from 'recoil';
import { getCouponWithCode, selectedCouponListSelector } from '../../recoil';
import useSelectCoupon from './useSelectCoupon';
import { isAvailableCoupon } from '../../domain/isAvailableCoupon';
import useOrderInformation from '../useOrderInformation';

export default function useCoupon(code: string) {
  const orderInformation = useOrderInformation();
  const selectedCoupons = useRecoilValue(selectedCouponListSelector);
  const getCoupon = useRecoilValue(getCouponWithCode);

  const { isSelected, toggleSelected: toggleCouponSelection } =
    useSelectCoupon(code);

  const checkAvailability = () => {
    if (!isSelected && selectedCoupons.length >= 2) return false;

    if (isAvailableCoupon({ orderInformation, coupon: getCoupon(code) }))
      return true;

    return false;
  };

  return {
    disabled: !checkAvailability(),
    toggleCouponSelection,
    isSelected,
  };
}
