import { MAX_COUPON_AMOUNT } from '../constants/config';
import { useCouponContext } from '../contexts/CouponContext';
import { useToastContext } from '../contexts/ToastContext';

const useCouponActions = (id: number) => {
  const { checkedCouponIds, addCheckedCouponIds, removeCheckedCouponIds } = useCouponContext();
  const { showToast } = useToastContext();

  const isChecked = checkedCouponIds.includes(id);

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeCheckedCouponIds(id);
      return;
    }

    if (checkedCouponIds.length >= MAX_COUPON_AMOUNT) {
      showToast(`쿠폰은 ${MAX_COUPON_AMOUNT}개 이상 사용할 수 없습니다!`);
      return;
    }
    addCheckedCouponIds(id);
  };

  return {
    isChecked,
    handleCheckBoxClick,
  };
};

export default useCouponActions;
