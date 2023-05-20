import { styled } from 'styled-components';

interface CheckBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  check: boolean;
}

const CheckBox = ({ onChange, check }: CheckBoxProps) => {
  return <CheckBoxInput type="checkbox" onChange={onChange} checked={check} />;
};

const CheckBoxInput = styled.input`
  width: 28px;
  height: 28px;

  background: #ffffff;
  border: 1px solid #22a6a2;
  border-radius: 2px;
`;

export default CheckBox;
