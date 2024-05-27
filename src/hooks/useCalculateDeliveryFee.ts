import { useRecoilState, useRecoilValue } from 'recoil';

import { DEFAULT_DELIVERY_FEE, DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../constants/DELIVERY_INFOS';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';
import { selectedDeliveryInfoListState } from '../recoil/DeliveryInfo/atoms/selectedDeliveryInfoListState';

export function useCalculateDeliveryFee() {
  const selectedDeliveryInfoList = useRecoilValue(selectedDeliveryInfoListState);
  const [deliveryFee, setDeliveryFee] = useRecoilState(deliveryFeeState);
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const calculateDeliveryFee = () => {
    if (selectedCartItemTotalPrice >= DELIVERY_FEE_DISCOUNT_THRESHOLD || selectedCartItemTotalPrice <= 0) {
      setDeliveryFee(0);
      return;
    }

    const totalDeliveryFee = selectedDeliveryInfoList.reduce((acc, cur) => {
      return acc + cur.surcharge;
    }, DEFAULT_DELIVERY_FEE);
    setDeliveryFee(totalDeliveryFee);
  };
  return { deliveryFee, calculateDeliveryFee };
}
