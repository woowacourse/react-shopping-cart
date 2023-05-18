import { ChangeEventHandler } from 'react';
import { styled } from 'styled-components';

interface Props {
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ isChecked, onChange }: Props) => {
  return <CheckboxStyle type="checkbox" onChange={onChange} checked={isChecked}></CheckboxStyle>;
};

export const CheckboxStyle = styled.input`
  width: 34px;
  height: 34px;
  margin-right: 15px;
  cursor: pointer;
`;

export default Checkbox;
