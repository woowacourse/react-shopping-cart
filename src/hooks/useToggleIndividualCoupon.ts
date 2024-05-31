import { useCouponManager } from '@/store/custom/useCouponManager';

const useToggleIndividualCoupon = (id: number) => {
  const { isCheckedIndividualCoupon } = useCouponManager();
  const [isChecked, setIsChecked] = isCheckedIndividualCoupon(id);

  const handleCouponCheckState = () => {
    setIsChecked((prev: boolean) => !prev);
  };

  return { isChecked, handleCouponCheckState };
};

export default useToggleIndividualCoupon;
