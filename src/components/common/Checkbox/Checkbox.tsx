import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

interface CheckBoxProps {
  checked: boolean;
}
const CheckBoxInput = styled.input`
  background-color: ${COLOR.black};
  width: 24px;
  height: 24px;
  border-radius: 8px;
`;

const CheckBox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & CheckBoxProps> = ({ checked, ...props }) => {
  return <CheckBoxInput type="checkbox" checked={checked} onChange={props.onChange} />;
};

export default CheckBox;
