import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({ children, checked, onChange }: PropsWithChildren<CheckBoxProps>) => {
  return (
    <Label>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </Label>
  );
};

export default CheckBox;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #00a59f;
`;
