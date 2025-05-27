import { ComponentProps } from 'react';
import * as S from './OrderConfirmationButton.styles';

function OrderConfirmationButton({ ...props }: ComponentProps<'button'>) {
  return <S.Container {...props}>주문 확인</S.Container>;
}

export default OrderConfirmationButton;
