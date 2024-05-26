import Checkbox from '../../assets/checkbox.svg';
import CheckboxDisable from '../../assets/checkbox-disable.svg';

import * as S from './CheckBox.style';

interface CheckProps {
  text?: string;
  isCheck: boolean;
  onClick: () => void;
}

export default function CheckBox({ text, isCheck, onClick }: CheckProps) {
  return (
    <S.CheckBoxLabel>
      <S.CheckBoxButton onClick={onClick}>
        <img src={isCheck ? Checkbox : CheckboxDisable} alt="상품 선택" />
      </S.CheckBoxButton>
      {text}
    </S.CheckBoxLabel>
  );
}
