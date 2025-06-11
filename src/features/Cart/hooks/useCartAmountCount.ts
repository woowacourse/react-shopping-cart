import { useSelectedCart } from './useSelectedCart';

export const useCartAmountCount = () => {
  const selectedItems = useSelectedCart();

  const selectedCartItemCount = selectedItems.length;
  const selectedTotalAmount = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return { selectedCartItemCount, selectedTotalAmount };
};
