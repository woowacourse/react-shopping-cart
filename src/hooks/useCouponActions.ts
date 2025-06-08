import { MAX_COUPON_AMOUNT } from '../constants/config';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { useCouponContext } from '../contexts/CouponContext';
import { useToastContext } from '../contexts/ToastContext';
import { getAvailableCoupons, getCheckedItems } from '../utils';

const useCouponActions = (id: number, deliveryPrice: number) => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const { coupons, checkedCouponIds, addCheckedCouponIds, removeCheckedCouponIds } =
    useCouponContext();
  const { showToast } = useToastContext();

  const isEnable = getAvailableCoupons(
    coupons,
    getCheckedItems(cartItems, checkedCartIds),
    deliveryPrice
  )
    .map((item) => item.id)
    .includes(id);

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
    isEnable,
    isChecked,
    handleCheckBoxClick,
  };
};

export default useCouponActions;
