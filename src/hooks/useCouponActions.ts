import { useCartItemsContext } from '../contexts/CartItemsContext';
import { useCouponContext } from '../contexts/CouponContext';
import { getAvailableCoupons, getCheckedItems } from '../utils';

const useCouponActions = (id: number) => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const { coupons, checkedCouponIds, addCheckedCouponIds, removeCheckedCouponIds } =
    useCouponContext();

  const isEnable = getAvailableCoupons(coupons, getCheckedItems(cartItems, checkedCartIds))
    .map((item) => item.id)
    .includes(id);

  const isChecked = checkedCouponIds.includes(id);

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeCheckedCouponIds(id);
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
