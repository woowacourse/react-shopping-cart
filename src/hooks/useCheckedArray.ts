import { useState } from 'react';
import { CartItemType } from '../types/response';

const useCheckedArray = (cartData: CartItemType[]) => {
  const [isCheckedArray, setIsCheckedArray] = useState<number[]>([]);

  const justifyIsChecked = (cartId: number) => {
    const isChecked = isCheckedArray.includes(cartId);
    return isChecked;
  };

  const controlCheckBox = (cartId: number) => {
    if (justifyIsChecked(cartId)) {
      setIsCheckedArray(isCheckedArray.filter((id) => id !== cartId));
      return;
    }

    setIsCheckedArray([...isCheckedArray, cartId]);
  };

  const controlAllCheckBox = (cartData: CartItemType[]) => {
    if (isCheckedArray.length === cartData.length) {
      setIsCheckedArray([]);
      return;
    }
    setIsCheckedArray(cartData.map((item) => item.id));
  };

  const initIsCheckedArray = (cartData: CartItemType[]) => {
    setIsCheckedArray(cartData.map((item) => item.id));
  };

  return {
    isAllChecked: isCheckedArray.length === cartData.length,
    isCheckedArray,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    initIsCheckedArray,
  };
};

export default useCheckedArray;
