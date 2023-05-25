import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  checked: boolean;
  onClickCheckbox?: () => void;
}

export default function CheckBox({ checked, onClickCheckbox }: Props) {
  const id = useId();

  return (
    <Wrapper>
      <input id={id} type="checkbox" checked={checked} />
      <CheckboxLabel htmlFor={id} onClick={onClickCheckbox}>
        {checked && <img src="./whiteCheck.svg" />}
      </CheckboxLabel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  border: 1.5px solid #22a6a2;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }

  input:checked ~ & {
    border-color: #3288ff;
    background: #333333;
  }
`;
