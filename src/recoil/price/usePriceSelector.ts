import { useRecoilValue } from 'recoil';
import { deliveryFeeSelector, orderedPriceSelector, totalPriceSelector } from './priceSelector';

const usePriceSelector = () => {
  const orderedPrice = useRecoilValue(orderedPriceSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

  return { orderedPrice, deliveryFee, totalPrice };
};

export default usePriceSelector;
