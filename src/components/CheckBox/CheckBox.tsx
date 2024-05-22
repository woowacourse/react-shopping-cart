import { CheckBoxGroup, CheckBoxStyle, CheckBoxLabel } from './CheckBox.style';
import Checkbox from '../../assets/checkbox.svg';
import CheckboxDisable from '../../assets/checkbox-disable.svg';

interface CheckProps {
  title?: string;
  text?: string;
  isCheck: boolean;
  onClick: () => void;
}

export default function CheckBox({ title, text, isCheck, onClick }: CheckProps) {
  return (
    <CheckBoxGroup>
      {title}
      <CheckBoxLabel>
        <CheckBoxStyle onClick={onClick}>
          <img src={isCheck ? Checkbox : CheckboxDisable} alt="상품 선택" />
        </CheckBoxStyle>
        {text}
      </CheckBoxLabel>
    </CheckBoxGroup>
  );
}
