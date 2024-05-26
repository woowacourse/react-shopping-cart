import { CartItem } from '@appTypes/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

import useCouponFinder from './useCouponFinder';

const useBuyXgetYTargetItem = () => {
  const selectedItems = useRecoilValue(selectedItemsSelector);
  const { getCoupon } = useCouponFinder();
  const bogoCoupon = getCoupon('BOGO');

  /**
   * 특정 수량 이상인 상품들 중 상품 가격이 가장 비싼 상품을 반환하는 함수
   * @param items
   * @param quantity
   * @returns
   */
  const getHighestPricedItem = (items: CartItem[], quantity: number) =>
    items.filter((item) => item.quantity >= quantity).sort((a, b) => b.product.price - a.product.price)[0];

  /**
   * buyXgetY 쿠폰 적용 대상인 상품을 반환하는 함수
   */
  const getBuyXgetYTargetItem = () => {
    const { buyQuantity, getQuantity } = bogoCoupon;

    if (!buyQuantity || !getQuantity) {
      console.error('BOGO 쿠폰 적용 수량을 찾을 수 없어요.');
      return null;
    }

    return getHighestPricedItem(selectedItems, buyQuantity + getQuantity);
  };

  return { getBuyXgetYTargetItem };
};

export default useBuyXgetYTargetItem;
