import { useRecoilState } from 'recoil';
import { selectedCouponListState } from '../recoil/couponList/selectedCouponListState';
import { Coupon } from '../types/coupon.type';
import { MAX_COUPON_COUNT } from '../constants/coupon';

const useSelectedCouponList = () => {
  const [selectedCouponList, setSelectedCouponList] = useRecoilState(selectedCouponListState);

  const selectCoupon = (coupon: Coupon) => {
    let updatedSelectedCouponList = [...selectedCouponList, coupon];
    if (updatedSelectedCouponList.length > MAX_COUPON_COUNT)
      updatedSelectedCouponList = updatedSelectedCouponList.slice(1);

    setSelectedCouponList(updatedSelectedCouponList);
  };

  const unselectCoupon = (couponId: number) => {
    const updatedSelectedCouponList = selectedCouponList.filter(({ id }) => id !== couponId);
    setSelectedCouponList(updatedSelectedCouponList);
  };

  // TODO: 이 메서드에 대한 테스트 작성
  const toggleSelectedCoupon = (coupon: Coupon) => {
    // TODO: 객체 포함이 되나?
    if (isSelectedCoupon(coupon.id)) unselectCoupon(coupon.id);
    else selectCoupon(coupon);
  };

  const isSelectedCoupon = (couponId: number) => {
    return selectedCouponList.some(({ id }) => id === couponId);
  };

  const clearSelectedCouponList = () => {
    setSelectedCouponList([]);
  };

  return {
    selectedCouponList,
    isSelectedCoupon,
    toggleSelectedCoupon,
    selectCoupon,
    unselectCoupon,
    clearSelectedCouponList,
  };
};

export default useSelectedCouponList;
