import { useRecoilState } from 'recoil';

import { selectedCouponListState } from '../../recoil/coupon/atom';

const useSelectedCoupon = () => {
  const [selectedCouponList, setSelectedCouponList] = useRecoilState(
    selectedCouponListState,
  );

  const selectCoupon = async (coupon: Coupon) => {
    setSelectedCouponList((prev) => [...prev, coupon]);
  };

  const unselectCoupon = async (coupon: Coupon) => {
    setSelectedCouponList((prev) =>
      [...prev].filter(({ id }) => id !== coupon.id),
    );
  };

  const toggleSelectedCoupon = (coupon: Coupon) => {
    isSelected(coupon.id) ? unselectCoupon(coupon) : selectCoupon(coupon);
  };

  const isSelected = (couponId: number) => {
    return selectedCouponList.some(({ id }) => id === couponId);
  };

  return {
    isSelected,
    toggleSelectedCoupon,
  };
};

export default useSelectedCoupon;
