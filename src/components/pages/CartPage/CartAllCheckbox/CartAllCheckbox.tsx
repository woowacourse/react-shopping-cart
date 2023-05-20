import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import cartToggleState, { allCheckedStatusSelector } from '../../../../recoil/cartToggleState';
import Checkbox from '../../../commons/Checkbox/Checkbox';

const CartAllCheckbox = () => {
  const isAllChecked = useRecoilValue(allCheckedStatusSelector);
  const [checked, setChecked] = useState(isAllChecked);

  const setCartToggleState = useSetRecoilState(cartToggleState);

  const toggleAll = (value: boolean) => {
    setChecked(value);

    setCartToggleState((prev) => {
      const cur: Record<number, boolean> = {};

      Object.keys(prev)
        .map(Number)
        .forEach((id) => {
          cur[id] = value;
        });
      return cur;
    });
  };

  useEffect(() => {
    setChecked(isAllChecked);
  }, [isAllChecked]);

  return (
    <Checkbox label="전체 상품 선택하기" checked={checked} onChange={() => toggleAll(!checked)} />
  );
};

export default CartAllCheckbox;
