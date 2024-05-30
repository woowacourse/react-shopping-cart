import { Text } from '@/f_shared';

import css from './EmptyCartMessage.module.css';

export const EmptyCartMessage = () => {
  return (
    <div className={css.root}>
      <Text type={'b1'}>장바구니가 텅 비어있어요.</Text>
    </div>
  );
};
