import { useRecoilState } from 'recoil';
import { isCheckedIndividualCartItem } from '../store/selectors';

const useToggleIndividualChecked = (id: number) => {
  const [isChecked, setIsChecked] = useRecoilState(isCheckedIndividualCartItem(id));

  const handleToggleSelect = () => {
    setIsChecked((prevState) => !prevState);
  };

  return {
    isChecked,
    handleToggleSelect,
  };
};
export default useToggleIndividualChecked;
