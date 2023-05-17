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
        {checked && <CheckedIcon />}
      </CheckboxLabel>
    </Wrapper>
  );
}

const CheckedIcon = () => (
  <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7L9.11069 14.1107L21.8318 1.38956" stroke="white" stroke-width="3" />
  </svg>
);

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

  input:checked ~ & {
    border-color: #3288ff;
    background: #333333;
  }
`;
