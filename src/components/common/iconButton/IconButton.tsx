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
        <img src="./assets/Plus.svg" />
      ) : actionType === 'minus' ? (
        <img src="./assets/Minus.svg" />
      ) : (
        <img src="./assets/DeleteCart.svg" width={12} />
      )}
    </S.Container>
  );
}

export default IconButton;
