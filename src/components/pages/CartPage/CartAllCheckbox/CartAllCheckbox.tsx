import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { allCheckedStatusSelector } from '../../../../recoil/cartToggleState';
import Checkbox from '../../../commons/Checkbox/Checkbox';

const CartAllCheckbox = () => {
  const [isAllChecked, setIsAllChecked] = useRecoilState(allCheckedStatusSelector);

  const [checked, setChecked] = useState(isAllChecked);

  useEffect(() => {
    setChecked(isAllChecked);
  }, [isAllChecked]);

  return (
    <Checkbox
      label="전체 상품 선택하기"
      checked={checked}
      onChange={() => {
        setChecked(!checked);
        setIsAllChecked(!checked);
      }}
    />
  );
};

export default CartAllCheckbox;
