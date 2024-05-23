import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isCheckedState } from '../store/atoms';
import { useEffect } from 'react';
import { productsIds } from '../store/selectors';

const useLocalStorage = () => {
  const keys = useRecoilValue(productsIds);
  const setIsCheckedMap = useSetRecoilState(isCheckedState);

  useEffect(() => {
    const localStorageState = window.localStorage.getItem('isChecked');
    const isCheckedMap: Record<number, boolean> = {};

    if (localStorageState) {
      const prevMapFromLocalStorage = JSON.parse(localStorageState);

      keys.forEach((key) => {
        const prevIsChecked = prevMapFromLocalStorage[key] ?? true;

        isCheckedMap[key] = prevIsChecked;
      });
    } else {
      keys.forEach((key) => {
        isCheckedMap[key] = true;
      });
    }

    setIsCheckedMap(isCheckedMap);
  }, []);
};

export default useLocalStorage;
