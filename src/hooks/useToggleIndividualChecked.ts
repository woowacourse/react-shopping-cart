import { useRecoilState } from 'recoil';
import { isCheckedIndividualCartItemSelector } from '../store/selectors';

const useToggleIndividualChecked = (id: number) => {
  const [isChecked, setIsChecked] = useRecoilState(isCheckedIndividualCartItemSelector(id));

  const handleToggleSelect = () => {
    setIsChecked((prevState) => !prevState);
  };

  return {
    isChecked,
    handleToggleSelect,
  };
};
export default useToggleIndividualChecked;
