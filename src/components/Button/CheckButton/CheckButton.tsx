import { ButtonHTMLAttributes } from 'react';
import { CheckedIcon, UncheckedIcon } from '../../../assets';
import * as S from './CheckButton.style';

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

function CheckButton({ isChecked, ...rest }: CheckButtonProps) {
  return (
    <S.ButtonWrapper $isChecked={isChecked} {...rest}>
      <img src={isChecked ? CheckedIcon : UncheckedIcon} alt="체크 아이콘" />
    </S.ButtonWrapper>
  );
}

export default CheckButton;
