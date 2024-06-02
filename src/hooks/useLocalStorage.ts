import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemsCheckedState, productsIdState } from '@store/productStore';

const useLocalStorage = () => {
  const keys = useRecoilValue(productsIdState);
  const setIsCheckedMap = useSetRecoilState(cartItemsCheckedState);

  useEffect(() => {
    const localStorageState = window.localStorage.getItem('cartItemsChecked');
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
