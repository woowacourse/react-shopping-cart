import { Text } from '@/f_shared/index';
import { Checkbox } from '@/f_shared/ui/Checkbox/Checkbox';

import css from './CheckAllCartButton.module.css';

// TODO: Add handler with state
export const CheckAllCartButton = () => {
  const checked = false; // temp

  return (
    <div className={css.root}>
      <Checkbox checked={checked} onChange={() => {}} />
      <Text type={'b2'}>전체 선택</Text>
    </div>
  );
};
