import { useRecoilState } from 'recoil';
import { selectedCouponListState } from './selectedCouponListState';
import { Coupon } from '../../types/coupon.type';
import { MAX_COUPON_COUNT } from '../../constants/coupon';

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

  return {
    selectedCouponList,
    selectCoupon,
    unselectCoupon,
  };
};

export default useSelectedCouponList;
