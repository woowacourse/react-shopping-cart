import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedDeliveryInfoListState } from '../../../components/DeliveryInfoList/recoil/atoms/selectedDeliveryInfoListState';
import { deliveryFeeState } from '../recoil/atoms/deliveryFeeState';
import { selectedCartItemListTotalPriceSelector } from '../../ShoppingCartPage/recoil/selector/selectedCartItemListTotalPriceSelector';

export const DELIVERY_FEE_DISCOUNT_THRESHOLD = 100000;

export function useCalculateDeliveryFee() {
  const selectedDeliveryInfoList = useRecoilValue(selectedDeliveryInfoListState);
  const [deliveryFee, setDeliveryFee] = useRecoilState(deliveryFeeState);
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const calculateDeliveryFee = () => {
    if (selectedCartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD) return 0;

    const totalDeliveryFee = selectedDeliveryInfoList.reduce((acc, cur) => {
      return acc + cur.surcharge;
    }, 3000);
    setDeliveryFee(totalDeliveryFee);
  };
  return { deliveryFee, calculateDeliveryFee };
}
