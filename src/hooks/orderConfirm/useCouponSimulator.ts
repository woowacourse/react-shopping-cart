import { useSimulateCouponCheck } from '@hooks/orderConfirm';
import { selectedCouponListAtom } from '@recoil/orderConfirm';
import { useRecoilState } from 'recoil';

const useCouponSimulator = () => {
  const [selectedCouponList, setSelectedCouponList] = useRecoilState(selectedCouponListAtom);

  const {
    temporarySelectedCouponList,
    temporaryTotalDiscountAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCoupon,
  } = useSimulateCouponCheck(selectedCouponList);

  const handleApplyCoupon = (onToggle: () => void) => {
    setSelectedCouponList([...temporarySelectedCouponList]);
    onToggle();
  };

  return {
    temporaryTotalDiscountAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCoupon,
    handleApplyCoupon,
  };
};

export default useCouponSimulator;
