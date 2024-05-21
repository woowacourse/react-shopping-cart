import { CheckBoxStyle } from './CheckBox.style';
import Checkbox from '../../assets/checkbox.svg';
import CheckboxDisable from '../../assets/checkbox-disable.svg';

interface CheckProps {
  isCheck: boolean;
  onClick: () => void;
}

export default function CheckBox({ isCheck, onClick }: CheckProps) {
  return (
    <CheckBoxStyle onClick={onClick}>
      <img src={isCheck ? Checkbox : CheckboxDisable} alt="상품 선택" />
    </CheckBoxStyle>
  );
}
