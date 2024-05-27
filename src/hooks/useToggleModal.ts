import { useRecoilState } from 'recoil';

import { isCouponSelectedState } from '../recoil/isCouponSelectedState/atoms/isCouponSelectedState';

export function useToggleModal() {
  const [isOpen, setIsOpen] = useRecoilState(isCouponSelectedState);

  const openModal = () => {
    setIsOpen((cur) => !cur);
  };

  return { isOpen, openModal };
}
