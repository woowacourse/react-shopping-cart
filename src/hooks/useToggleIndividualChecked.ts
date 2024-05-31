import { useCartManager } from '@/store/custom/useCartManager';

const useToggleIndividualChecked = (id: number) => {
  const { isCheckedIndividualCartItem } = useCartManager();

  const [isChecked, setIsChecked] = isCheckedIndividualCartItem(id);

  const handleToggleSelect = () => {
    setIsChecked((prevState: boolean) => !prevState);
  };

  return {
    isChecked,
    handleToggleSelect,
  };
};

export default useToggleIndividualChecked;
