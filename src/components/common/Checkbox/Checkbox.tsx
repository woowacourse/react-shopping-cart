import * as Styled from './Checkbox.styled';

interface CheckBoxProps {
  checked: boolean;
}

const CheckBox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & CheckBoxProps> = ({ checked, ...props }) => {
  return <Styled.CheckBoxInput type="checkbox" checked={checked} {...props} />;
};

export default CheckBox;
