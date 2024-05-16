import { ButtonHTMLAttributes } from 'react';
import { CheckedIcon, UncheckedIcon } from '../../../assets';
import * as S from './CheckButton.style';

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
}

function CheckButton({ isChecked, ...rest }: CheckButtonProps) {
  return (
    <S.ButtonWrapper $isChecked={isChecked} {...rest}>
      {isChecked ? <img src={CheckedIcon}></img> : <img src={UncheckedIcon}></img>}
    </S.ButtonWrapper>
  );
}

export default CheckButton;
