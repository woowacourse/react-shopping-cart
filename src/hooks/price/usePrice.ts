import { hasExtraDeliveryFeeState } from '../../recoil/cartItem/atom';
import useSelectedCartItemList from '../cartItem/useSelectedCartItemList';
import { useRecoilValue } from 'recoil';

export const DELIVERY_FEE_THRESHOLD = 100_000;
export const DELIVERY_FEE = 3_000;
export const EXTRA_DELIVERY_FEE = 3_000;

const usePrice = () => {
  const { selectedCartItemList } = useSelectedCartItemList();
  const hasExtraDeliveryFee = useRecoilValue(hasExtraDeliveryFeeState);
  const extraDeliveryFee = hasExtraDeliveryFee ? EXTRA_DELIVERY_FEE : 0;

  const orderedPrice: number = selectedCartItemList.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  );

  const deliveryFee: number =
    orderedPrice < DELIVERY_FEE_THRESHOLD
      ? DELIVERY_FEE + extraDeliveryFee
      : 0 + extraDeliveryFee;

  const totalPrice: number = orderedPrice + deliveryFee;

  return {
    orderedPrice,
    deliveryFee,
    totalPrice,
  };
};

export default usePrice;
