import { selectedItemsSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

import useCouponFinder from './useCouponFinder';

const useBuyXgetYTargetItem = () => {
  const selectedItems = useRecoilValue(selectedItemsSelector);
  const { getCoupon } = useCouponFinder();
  const bogoCoupon = getCoupon('BOGO');

  const getBuyXgetYTargetItem = () => {
    const { buyQuantity } = bogoCoupon;

    if (!buyQuantity) {
      console.error('BOGO 쿠폰의 buyQuantity를 찾을 수 없어요.');
      return null;
    }

    return selectedItems
      .filter((item) => item.quantity >= buyQuantity)
      .sort((prev, cur) => cur.product.price - prev.product.price)[0];
  };

  return { getBuyXgetYTargetItem };
};

export default useBuyXgetYTargetItem;
