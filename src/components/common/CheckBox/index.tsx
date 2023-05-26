import { styled } from 'styled-components';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement>{
  checked: boolean;
}

const CheckBox = ({ checked, ...rest }: CheckBoxProps) => {
  return <CheckBoxInput type="checkbox" {...rest} checked={checked} />;
};

const CheckBoxInput = styled.input`
  width: 28px;
  height: 28px;

  background: #ffffff;
  border: 1px solid #22a6a2;
  border-radius: 2px;
`;

export default CheckBox;
