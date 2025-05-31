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
        <img src="./assets/Plus.svg" alt="장바구니 수량 증가 버튼" />
      ) : actionType === 'minus' ? (
        <img src="./assets/Minus.svg" alt="장바구니 수량 감소 버튼" />
      ) : (
        <img
          src="./assets/DeleteCart.svg"
          width={12}
          alt="장바구니 삭제 버튼"
        />
      )}
    </S.Container>
  );
}

export default IconButton;
