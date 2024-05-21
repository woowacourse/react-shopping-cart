import { CouponKey } from '@appTypes/shoppingCart';
import { COUPON } from '@constants/coupon';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

interface UseCalculateDiscountProp {
  code: CouponKey;
}
const useCalculateDiscount = ({ code }: UseCalculateDiscountProp) => {
  const coupon = COUPON.get(code);
  const selectedItems = useRecoilValue(selectedItemsSelector);

  const getTwoPlusOneTargetItem = () => {
    const { quantity } = coupon.condition;

    return selectedItems
      .filter((i) => i.quantity >= quantity)
      .sort((acc, cur) => cur.product.price - acc.product.price)[0];
  };
};

export default useCalculateDiscount;
