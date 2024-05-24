import { useSimulateCouponCheck } from '@hooks/orderConfirm';
import { selectedCouponListAtom } from '@recoil/orderConfirm';
import { useRecoilState } from 'recoil';

const useCouponSimulator = () => {
  const [selectedCouponList, setSelectedCouponList] = useRecoilState(selectedCouponListAtom);

  const {
    temporarySelectedCouponList,
    temporarySelectedTotalCouponAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCouponList,
  } = useSimulateCouponCheck(selectedCouponList);

  const handleApplyCoupon = (onToggle: () => void) => {
    setSelectedCouponList([...temporarySelectedCouponList]);
    onToggle();
  };

  return {
    temporarySelectedTotalCouponAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCouponList,
    handleApplyCoupon,
  };
};

export default useCouponSimulator;
