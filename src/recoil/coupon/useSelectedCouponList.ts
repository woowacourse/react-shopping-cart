import { useRecoilState } from 'recoil';
import { selectedCouponListAtom } from './couponListAtom';

const useSelectedCouponList = () => {
  const [selectedIdList, setSelectedIdList] = useRecoilState(
    selectedCouponListAtom,
  );

  const addSelectedCoupon = async (coupon: Coupon) => {
    setSelectedIdList((prev) => [...prev, coupon]);
  };

  const removeSelectedCoupon = async (coupon: Coupon) => {
    setSelectedIdList((prev) => [...prev].filter(({ id }) => id !== coupon.id));
  };

  const toggleSelectedCoupon = (coupon: Coupon) => {
    isSelected(coupon.id)
      ? removeSelectedCoupon(coupon)
      : addSelectedCoupon(coupon);
  };

  const isSelected = (couponId: number) => {
    return selectedIdList.some(({ id }) => id === couponId);
  };

  return {
    selectedIdList,
    toggleSelectedCoupon,
    isSelected,
  };
};

export default useSelectedCouponList;
