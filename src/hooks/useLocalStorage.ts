import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isCheckedState, productsIdState } from '../store/productStore';

const useLocalStorage = () => {
  const keys = useRecoilValue(productsIdState);
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
  }, [keys, setIsCheckedMap]);
};

export default useLocalStorage;
