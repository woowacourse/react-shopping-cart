import { useRecoilState } from 'recoil';
import { itemsAllSelectedState } from '../recoil';

export default function useSelectAllCartItem() {
  const [isAllSelected, setAllSelected] = useRecoilState(itemsAllSelectedState);

  const toggleAllSelected = () => {
    setAllSelected((prev) => !prev);
  };

  return {
    isAllSelected,
    toggleAllSelected,
  };
}
