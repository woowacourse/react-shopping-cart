import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

interface CheckBoxProps {
  label?: string;
  onCheck?: (isCheck: boolean) => void;
  checked: boolean;
  onClick?: () => void;
}

const CheckBox = ({ label, onCheck, checked, onClick }: CheckBoxProps) => {
  return (
    <CheckBoxWrapper>
      <CheckBoxInput
        type="checkbox"
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onCheck && onCheck(e.target.checked)}
        onClick={() => onClick && onClick()}
      />
      {label && <LabelText>{label}</LabelText>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
`;

const CheckBoxInput = styled.input`
  -webkit-appearance: none;
  appearance: none;

  width: 28px;
  height: 100%;
  border-radius: 2px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  outline: none;
  cursor: pointer;
  box-sizing: border-box;

  &:checked {
    border: solid 1px #3288ff;

    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg width='23' height='17' viewBox='0 0 23 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M2 7L9.11069 14.1107L21.8318 1.38956' stroke='white' stroke-width='3'/%3e%3c/svg%3e");
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #04c09e;
  }
`;

const LabelText = styled.label`
  margin-left: 13px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
`;
