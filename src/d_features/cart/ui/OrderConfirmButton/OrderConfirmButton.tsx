import classNames from 'classnames/bind';

import { Button } from '@/f_shared';

import css from './OrderConfirmButton.module.css';

const cn = classNames.bind(css);

// TODO: Add OnClickHandler
export const OrderConfirmButton = () => {
  // TODO: Connect to disable state
  // const disabled = useRecoilValue(OrderConfirmButtonDisabledState);
  const disabled = false; // temp

  return (
    <Button disabled={disabled} className={cn('root')} theme={'primary'} onClick={() => {}}>
      주문 확인
    </Button>
  );
};
