import { useRecoilState } from 'recoil';
import { selectedCartItems } from '../recoil/atoms';
import { CartItem } from '../api/get/getItems';

const useSelectedItem = (getOneItemQuantity: (id: number) => number | undefined) => {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItems);

  const isSelected = (id: number) => {
    return selectedItems.find(item => item.cartItemId === id) !== undefined;
  };

  const toggleItemSelection = (cartItem: CartItem) => {
    const isSelectedItem = isSelected(cartItem.id);
    if (isSelectedItem) {
      setSelectedItems(prev => prev.filter(item => item.cartItemId !== cartItem.id));
    } else {
      setSelectedItems(prev => [
        ...prev,
        {
          cartItemId: cartItem.id,
          price: cartItem.product.price,
          quantity: getOneItemQuantity(cartItem.id) ?? cartItem.quantity,
        },
      ]);
    }
  };

  const updateSelectedItemQuantity = (cartItem: CartItem, newQuantity: number) => {
    setSelectedItems(
      selectedItems.map(item =>
        item.cartItemId === cartItem.id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return {
    isSelected,
    toggleItemSelection,
    updateSelectedItemQuantity,
  };
};

export default useSelectedItem;
