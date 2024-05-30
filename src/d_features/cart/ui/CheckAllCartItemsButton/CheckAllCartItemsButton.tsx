import { useRecoilValue } from 'recoil';

import { Text } from '@/f_shared/index';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

import { areAllCheckedState, useToggleAllChecked } from '../../model/check';

import css from './CheckAllCartItemsButton.module.css';

export const CheckAllCartItemsButton = () => {
  const allChecked = useRecoilValue(areAllCheckedState);
  const toggleAllChecked = useToggleAllChecked();

  return (
    <div className={css.root}>
      <Checkbox checked={allChecked} onChange={toggleAllChecked} />
      <Text type={'b2'}>전체 선택</Text>
    </div>
  );
};
