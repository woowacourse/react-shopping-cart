import { useRecoilState } from 'recoil';
import { isAllCheckedCartItems } from '@/store/selectors';

const useToggleAllChecked = () => {
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedCartItems);

  const handleToggleAll = () => {
    setIsAllChecked(!isAllChecked); // 토글 상태를 반전하여 set 함수 호출
  };
  return {
    isAllChecked,
    handleToggleAll,
  };
};

export default useToggleAllChecked;
