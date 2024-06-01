import { useRecoilValue, useSetRecoilState } from 'recoil';
import { couponsState, selectedCouponsState } from '../recoil/atoms';

export const useUpdateSelectedCoupons = () => {
  const setSelectedCouponsState = useSetRecoilState(selectedCouponsState);
  const coupons = useRecoilValue(couponsState);

  const updateSelectedCoupons = () => {
    setSelectedCouponsState(coupons);
  };

  return {
    updateSelectedCoupons,
  };
};
