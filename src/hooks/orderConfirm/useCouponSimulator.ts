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

  const onApplyCoupon = (onToggle: () => void) => {
    setSelectedCouponList([...temporarySelectedCouponList]);
    onToggle();
  };

  return {
    temporarySelectedCouponList,
    temporaryTotalDiscountAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCoupon,
    onApplyCoupon,
  };
};

export default useCouponSimulator;
