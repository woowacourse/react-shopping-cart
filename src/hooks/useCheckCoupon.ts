import { useRecoilState } from 'recoil';
import { checkedCouponIdsState } from '../recoil/atoms';

export default function useCheckCoupon() {
  const [checkedCouponIds, setCheckedCouponIds] = useRecoilState(checkedCouponIdsState);

  const isCheckedCoupon = (id: number) => checkedCouponIds.includes(id);

  const isReachedCouponsLimit = checkedCouponIds.length >= 2;

  const onCheckCoupon = (id: number, isChecked: boolean) => {
    const newCheckedCouponIds = isChecked
      ? [...checkedCouponIds, id]
      : [...checkedCouponIds].filter((couponId) => couponId !== id);
    setCheckedCouponIds(newCheckedCouponIds);
  };

  return { isCheckedCoupon, isReachedCouponsLimit, onCheckCoupon };
}
