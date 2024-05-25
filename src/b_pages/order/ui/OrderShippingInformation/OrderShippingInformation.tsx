import { CheckExtraFeeRegionButton } from '@/d_features/order';
import { Text } from '@/f_shared';

import css from './OrderShippingInformation.module.css';

export const OrderShippingInformation = () => {
  return (
    <div className={css.root}>
      <Text type={'h2'}>배송 정보</Text>
      <CheckExtraFeeRegionButton />
    </div>
  );
};
