import { Checkbox, Text } from '@/f_shared';

import css from './CheckExtraFeeRegionButton.module.css';

export const CheckExtraFeeRegionButton = () => {
  return (
    <label className={css.root}>
      <Checkbox checked={false} onChange={() => {}} />
      <Text type={'b2'}>제주도 및 도서 산간 지역</Text>
    </label>
  );
};
