import { CartItemType } from '../types';

import {
  freeShippingSelector,
  numberOfTypesSelector,
  selectedCartItemListSelector,
  shippingFeeSelector,
  totalPriceSelector,
  totalQuantitySelector,
} from '../recoil';
import { useRecoilValue } from 'recoil';

export interface OrderInformation {
  totalPrice: number;
  totalQuantity: number;
  numOfTypes: number;
  shippingFee: number;
  selectedItems: CartItemType[];
}

export default function useOrderInformation(): OrderInformation {
  const selectedItems = useRecoilValue(selectedCartItemListSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);
  const totalQuantity = useRecoilValue(totalQuantitySelector);
  const numOfTypes = useRecoilValue(numberOfTypesSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  return {
    selectedItems,
    totalPrice,
    totalQuantity,
    numOfTypes,
    shippingFee,
  };
}
