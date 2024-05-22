import { useRecoilState } from 'recoil';
import { applyCouponModalState } from '../recoil/Coupon/atoms';

export function useToggleModal() {
  const [isOpen, setIsOpen] = useRecoilState(applyCouponModalState);

  const openModal = () => {
    setIsOpen((cur) => !cur);
  };

  return { isOpen, openModal };
}
