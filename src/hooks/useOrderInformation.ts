import { useRecoilValue } from 'recoil';
import {
  numberOfTypesSelector,
  shippingFeeSelector,
  totalPriceSelector,
  totalQuantitySelector,
} from '../recoil';

export default function useOrderInformation() {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const totalQuantity = useRecoilValue(totalQuantitySelector);
  const numOfTypes = useRecoilValue(numberOfTypesSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  return {
    totalPrice,
    totalQuantity,
    numOfTypes,
    shippingFee,
  };
}
