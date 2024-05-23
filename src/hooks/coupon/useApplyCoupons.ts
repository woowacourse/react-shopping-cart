import { useRecoilState } from 'recoil';
import { selectedCoupons } from '../../recoil/atoms';
import { Coupon } from '../../types/coupon';

const useApplyCoupons = () => {
  const [applyingCoupons, setApplyingCoupons] = useRecoilState(selectedCoupons);

  const changeApplying = (coupon: Coupon) => {
    const alreadyExist = applyingCoupons.find(applying => applying.id === coupon.id) !== undefined;

    if (alreadyExist) {
      setApplyingCoupons(prev => prev.filter(applying => applying.id !== coupon.id));
    } else {
      setApplyingCoupons(prev => [...prev, coupon]);
    }
  };

  return {
    applyingCoupons,
    changeApplying,
  };
};

export default useApplyCoupons;
