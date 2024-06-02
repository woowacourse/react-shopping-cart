import { useRecoilState } from 'recoil';
import { selectedCouponIdListState } from '../recoil/couponList/selectedCouponIdListState';
import { MAX_COUPON_COUNT } from '../constants/coupon';

const useSelectedCouponIdList = () => {
  const [selectedCouponIdList, setSelectedCouponIdList] = useRecoilState(selectedCouponIdListState);

  const selectCoupon = (couponId: number) => {
    let updatedSelectedCouponList = [...selectedCouponIdList, couponId];
    if (updatedSelectedCouponList.length > MAX_COUPON_COUNT)
      updatedSelectedCouponList = updatedSelectedCouponList.slice(1);

    setSelectedCouponIdList(updatedSelectedCouponList);
  };

  const unselectCoupon = (couponId: number) => {
    const updatedSelectedCouponList = selectedCouponIdList.filter((id) => id !== couponId);
    setSelectedCouponIdList(updatedSelectedCouponList);
  };

  const toggleSelectedCoupon = (couponId: number) => {
    if (isSelectedCoupon(couponId)) unselectCoupon(couponId);
    else selectCoupon(couponId);
  };

  const isSelectedCoupon = (couponId: number) => {
    return selectedCouponIdList.some((id) => id === couponId);
  };

  const clearSelectedCouponIdList = () => {
    setSelectedCouponIdList([]);
  };

  return {
    selectedCouponIdList,
    isSelectedCoupon,
    toggleSelectedCoupon,
    selectCoupon,
    unselectCoupon,
    clearSelectedCouponIdList,
  };
};

export default useSelectedCouponIdList;
