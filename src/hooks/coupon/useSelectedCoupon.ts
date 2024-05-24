import { useRecoilState } from 'recoil';

import { selectedCouponListState } from '../../recoil/coupon/atom';

const useSelectedCoupon = () => {
  const [selectedIdList, setSelectedIdList] = useRecoilState(
    selectedCouponListState,
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
    isSelected,
    toggleSelectedCoupon,
  };
};

export default useSelectedCoupon;
