import { useCouponManager } from '@/store/custom/useCouponManager';

const useToggleIndividualCoupon = (id: number) => {
  const { isCheckedIndividualCoupon, setCheckedIndividualCoupon } = useCouponManager();
  const isChecked = isCheckedIndividualCoupon(id);
  const setIsChecked = setCheckedIndividualCoupon(id);

  const handleCouponCheckState = () => {
    setIsChecked((prev: boolean) => !prev);
  };

  return { isChecked, handleCouponCheckState };
};

export default useToggleIndividualCoupon;
