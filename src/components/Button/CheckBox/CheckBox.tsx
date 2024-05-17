import { InputHTMLAttributes } from 'react';
import { CheckedIcon, UncheckedIcon } from '../../../assets';
import * as S from './CheckBox.style';

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  isChecked: boolean;
  text?: string;
}

function CheckBox({ id, isChecked, text, ...rest }: CheckBoxProps) {
  return (
    <S.CheckBoxWrapper>
      <input type="checkbox" {...rest} id={id} checked={isChecked} />
      <S.CheckBoxLabel htmlFor={id} $isChecked={isChecked}>
        <img src={isChecked ? CheckedIcon : UncheckedIcon} alt="체크 아이콘" />
      </S.CheckBoxLabel>
      {text && <p>{text}</p>}
    </S.CheckBoxWrapper>
  );
}

export default CheckBox;
