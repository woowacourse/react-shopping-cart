import { couponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

interface Props {
  date: Date;
}

const useCouponValidator = ({ date }: Props) => {
  const couponList = useRecoilValue(couponListState);

  const canSelectCouponList = couponList.map((item) => {
    if (!item.expirationDate || new Date(item.expirationDate) > date) {
      return {
        ...item,
        isValid: true,
      };
    } else {
      return {
        ...item,
        isValid: false,
      };
    }
  });

  return canSelectCouponList;
};

export default useCouponValidator;
