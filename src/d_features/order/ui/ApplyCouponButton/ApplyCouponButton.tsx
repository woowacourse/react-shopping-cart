import { Button, Text } from '@/f_shared';

import css from './ApplyCouponButton.module.css';

export const ApplyCouponButton = () => {
  return (
    <Button className={css.root} onClick={() => {}}>
      <Text tag={'span'} type={'c3'}>
        쿠폰 적용
      </Text>
    </Button>
  );
};
