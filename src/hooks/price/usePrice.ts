import { hasExtraDeliveryFeeState } from '../../recoil/cartItem/atom';
import useSelectedCartItemList from '../cartItem/useSelectedCartItemList';
import { useRecoilValue } from 'recoil';

const DELIVERY_FEE_THRESHOLD = 100_000;
const DELIVERY_FEE = 3_000;
const EXTRA_DELIVERY_FEE = 3_000;

const usePrice = () => {
  const { selectedCartItemList } = useSelectedCartItemList();
  const hasExtraDeliveryFee = useRecoilValue(hasExtraDeliveryFeeState);
  const extraDeliveryFee = hasExtraDeliveryFee ? EXTRA_DELIVERY_FEE : 0;

  const orderedPrice = selectedCartItemList.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  );

  const deliveryFee =
    orderedPrice < DELIVERY_FEE_THRESHOLD
      ? DELIVERY_FEE + extraDeliveryFee
      : 0 + extraDeliveryFee;

  const totalPrice = orderedPrice + deliveryFee;

  return {
    orderedPrice,
    deliveryFee,
    totalPrice,
  };
};

export default usePrice;
