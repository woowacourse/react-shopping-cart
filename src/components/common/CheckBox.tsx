import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const CheckBox = ({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <>
      <StyledInput id={id} type='checkbox' checked={checked} onChange={onChange}></StyledInput>
      <StyledLabel htmlFor={id}></StyledLabel>
    </>
  );
};

const StyledInput = styled.input`
  display: none;

  &:checked + label::after {
    ${flexCenter}
    content: '✔';
    font-size: 25px;

    color: white;
    background-color: ${theme.colors.primary};

    width: 30px;
    height: 30px;
    position: absolute;

    left: -3px;
    top: -3px;
  }
`;

const StyledLabel = styled.label`
  caret-color: transparent;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid #707070;
  position: relative;
`;

export default CheckBox;
