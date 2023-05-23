import { styled } from 'styled-components';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: () => void;
}

export const CheckBox = ({ isChecked, onChange }: CheckBoxProps) => {
  return (
    <StyledCheckBoxInput
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
    ></StyledCheckBoxInput>
  );
};

const StyledCheckBoxInput = styled.input`
  width: 28px;
  height: 28px;
  background-color: var(--white-color);
  border: 1px solid var(--label-color);
  border-radius: 2px;
`;
