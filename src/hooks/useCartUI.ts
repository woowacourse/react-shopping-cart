import { getCartDescription } from '../utils/cartCalculations';

interface UseCartUIProps {
  itemCount: number;
  checkedItemsCount: number;
}

export const useCartUI = ({ itemCount, checkedItemsCount }: UseCartUIProps) => {
  const descriptionMessage = () => getCartDescription(itemCount);
  const isDisabled = checkedItemsCount === 0;

  return {
    descriptionMessage,
    isDisabled,
  };
};
