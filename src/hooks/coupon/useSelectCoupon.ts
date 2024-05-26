import { useRecoilState } from 'recoil';
import { couponSelectedState } from '../../recoil';

export default function useSelectCoupon(code: string) {
  const [isSelected, setSelected] = useRecoilState(couponSelectedState(code));

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return { isSelected, toggleSelected };
}
