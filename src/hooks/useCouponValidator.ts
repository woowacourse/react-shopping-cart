import { couponListState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

interface Props {
  date: Date;
}

const useCouponValidator = ({ date }: Props) => {
  const couponList = useRecoilValue(couponListState);

  const canSelectCouponList = couponList.filter((item) => {
    if (!item.expirationDate) return item;
    const expirationDate = new Date(item.expirationDate);
    if (expirationDate > date) return item;
  });

  return canSelectCouponList;
};

export default useCouponValidator;
