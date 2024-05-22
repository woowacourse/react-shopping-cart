import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedDeliveryInfoListState } from '../recoil/DeliveryInfo/atoms/selectedDeliveryInfoListState';
import { deliveryFeeState } from '../pages/OrderConfirmPage/recoil/atoms/deliveryFeeState';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../constants/DELIVERY_INFOS';

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
    }, 3000);
    setDeliveryFee(totalDeliveryFee);
  };
  return { deliveryFee, calculateDeliveryFee };
}
