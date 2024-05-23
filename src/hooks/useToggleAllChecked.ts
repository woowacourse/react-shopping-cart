import { useCartManager } from '@/store/custom/useCartManager';

const useToggleAllChecked = () => {
  const { isAllCheckedCartItems } = useCartManager();
  const [isAllChecked, setIsAllChecked] = isAllCheckedCartItems;

  const handleToggleAll = () => {
    setIsAllChecked((prev: boolean) => !prev);
  };

  return {
    isAllChecked,
    handleToggleAll,
  };
};

export default useToggleAllChecked;
