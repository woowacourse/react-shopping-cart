import { useRecoilState } from 'recoil';
import { isAllCheckedCartItemsSelector } from '@/store/selectors';

const useToggleAllChecked = () => {
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedCartItemsSelector);

  const handleToggleAll = () => {
    setIsAllChecked((prev) => !prev);
  };
  return {
    isAllChecked,
    handleToggleAll,
  };
};

export default useToggleAllChecked;
