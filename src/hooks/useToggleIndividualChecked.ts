import { isCheckedState } from '../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import areAllItemsChecked from '../utils/areAllItemsChecked';
import { productsIds } from '../store/selectors';
import { useEffect } from 'react';

type HookProps = {
  id: number;
  setAllChecked: (allChecked: boolean) => void;
};

const useToggleIndividualChecked = ({ id, setAllChecked }: HookProps) => {
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState(id));
  const productIds = useRecoilValue(productsIds);

  useEffect(() => {
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(isChecked));
  }, []);

  const handleToggleSelect = (id: number) => {
    const newIsChecked = !isChecked;

    setIsChecked(newIsChecked);
    window.localStorage.setItem(JSON.stringify(id), JSON.stringify(newIsChecked));

    const isAllChecked = areAllItemsChecked(productIds);

    setAllChecked(isAllChecked);
  };

  return { handleToggleSelect, isChecked };
};

export default useToggleIndividualChecked;
