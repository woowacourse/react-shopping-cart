import { ComponentProps } from 'react';
import * as S from './OrderConfirmationButton.styles';

interface OrderConfirmationButtonProps {
  inActive: boolean;
}

function OrderConfirmationButton({
  inActive,
  ...props
}: OrderConfirmationButtonProps & ComponentProps<'button'>) {
  return (
    <S.Container inActive={inActive} {...props}>
      주문 확인
    </S.Container>
  );
}

export default OrderConfirmationButton;
