import { useRecoilState } from 'recoil';
import { cartItemSelectedState } from '../recoil';

export default function useSelectCartItem(id: number) {
  const [isSelected, setSelected] = useRecoilState(cartItemSelectedState(id));

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return { isSelected, toggleSelected };
}
