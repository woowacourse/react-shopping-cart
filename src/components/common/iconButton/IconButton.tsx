import { ComponentProps } from 'react';
import * as S from './IconButton.styles';

interface IconButtonProps {
  actionType: 'plus' | 'minus' | 'delete';
}

function IconButton({
  actionType,
  ...props
}: IconButtonProps & ComponentProps<'button'>) {
  return (
    <S.Container {...props}>
      {actionType === 'plus' ? (
        <img src="./assets/plus.svg" />
      ) : actionType === 'minus' ? (
        <img src="./assets/minus.svg" />
      ) : (
        <img src="./assets/deleteCart.svg" width={12} />
      )}
    </S.Container>
  );
}

export default IconButton;
