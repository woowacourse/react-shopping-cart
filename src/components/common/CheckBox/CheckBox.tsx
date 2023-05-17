import { useState } from 'react';
import { styled } from 'styled-components';
import CheckIcon from '../../../assets/icons/CheckIcon';

interface CheckBoxProps {
  defaultChecked?: boolean;
  labelText?: string;
  onChange?: (isChecked: boolean) => void;
}

const CheckBox = ({ defaultChecked, labelText, onChange }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <Label>
      <InputWrapper>
        <Input checked={isChecked} onChange={handleChange} />
        {isChecked && (
          <IconWrapper>
            <CheckIcon />
          </IconWrapper>
        )}
      </InputWrapper>
      {labelText && <LabelText>{labelText}</LabelText>}
    </Label>
  );
};

const Label = styled.label`
  display: inline-flex;
  gap: 12px;
`;

const InputWrapper = styled.span`
  position: relative;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;

  width: 28px;
  height: 28px;

  border: 1px solid #22a6a2;
  border-radius: 2px;

  &:checked {
    border: 1px solid #3288ff;
    background-color: #333;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const LabelText = styled.span`
  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 16px;
  color: #333;
`;

export default CheckBox;
