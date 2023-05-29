import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { checkedPriceSelector } from '../states/checkedCartProducts';

const DELIVERY_FEE = 3_000;

const useExpectedPayment = () => {
  const { isAllUnchecked } = useMultipleChecked();
  const totalProductPrice = useRecoilValue(checkedPriceSelector);

  const deliveryFee = isAllUnchecked ? 0 : DELIVERY_FEE;
  const totalPrice = totalProductPrice + deliveryFee;

  return {
    totalProductPrice: totalProductPrice.toLocaleString('ko-KR'),
    deliveryFee: deliveryFee.toLocaleString('ko-KR'),
    totalPrice: totalPrice.toLocaleString('ko-KR'),
  };
};

export default useExpectedPayment;
