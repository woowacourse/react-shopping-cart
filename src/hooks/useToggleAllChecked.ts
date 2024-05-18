import { useRecoilState } from 'recoil';
import { isAllCheckedCartItems } from '@/store/selectors';

const useToggleAllChecked = () => {
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedCartItems);

  const handleToggleAll = () => {
    setIsAllChecked((prev) => !prev);
  };
  return {
    isAllChecked,
    handleToggleAll,
  };
};

export default useToggleAllChecked;
