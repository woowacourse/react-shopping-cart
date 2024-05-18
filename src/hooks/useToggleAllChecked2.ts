import { useRecoilState } from 'recoil';
import { CartItemData } from '@/types';
import { allCartItemStates } from '../store/atoms';

const useToggleAllChecked = () => {
  const [allCartItems, setAllCartItems] = useRecoilState(allCartItemStates);

  const handleToggleAll = () => {
    const areAllChecked = allCartItems.every((item: CartItemData) => item.product.isChecked);

    const toggledItems = allCartItems.map((item: CartItemData) => ({
      ...item,
      product: {
        ...item.product,
        isChecked: !areAllChecked,
      },
    }));

    setAllCartItems(toggledItems);
  };

  return {
    handleToggleAll,
  };
};

export default useToggleAllChecked;
