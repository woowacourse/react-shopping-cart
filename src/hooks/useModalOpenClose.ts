import { useToggle } from './useToggle';

interface ModalOpenCloseProps {
  setCoupons: () => void;
  apply: () => void;
}

export function useModalOpenClose({ setCoupons, apply }: ModalOpenCloseProps) {
  const { value: isOpen, on: open, off: close } = useToggle(false);

  const handleOpen = () => {
    setCoupons();
    open();
  };

  const handleApply = () => {
    apply();
    close();
  };

  return { isOpen, handleOpen, handleApply, close };
}
