import { useEffect } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import usePreviousValue from './usePreviousValue';
import { productToggleSelector } from '../recoil/cartToggleState';

const useToggleSetterEffect = (productId: number, value: number) => {
  const prevValue = usePreviousValue(value);

  const toggleSetter = useSetRecoilState(productToggleSelector(productId));
  const deleteToggleInfo = useResetRecoilState(productToggleSelector(productId));

  useEffect(() => {
    if (prevValue === value) return;

    if (prevValue === 0 && value > 0) {
      toggleSetter(true);
      return;
    }

    if (value === 0) {
      deleteToggleInfo();
    }
  }, [productId, value]);
};

export default useToggleSetterEffect;
