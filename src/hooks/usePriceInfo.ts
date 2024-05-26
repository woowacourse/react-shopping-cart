import { ORDER } from '@constants/constants';
import { discountAmountStore, selectedCartItems } from '@recoil/atoms';
import { useRecoilValue } from 'recoil';

const usePriceInfo = (isolatedRegion: boolean = false) => {
  const selectedItems = useRecoilValue(selectedCartItems);
  const discountAmount = useRecoilValue(discountAmountStore);

  const price = selectedItems.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
  const isShippingFree = price >= ORDER.SHIPPING_FREE_PRICE || price === 0;

  const shipping = isShippingFree
    ? 0
    : isolatedRegion
      ? ORDER.SHIPPING_FEE + 3000
      : ORDER.SHIPPING_FEE;

  return {
    order: price,
    shipping,
    total: price + shipping - discountAmount,
  };
};

export default usePriceInfo;
