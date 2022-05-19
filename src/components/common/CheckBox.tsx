import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const CheckBox = ({ id }: { id: string }) => {
  return (
    <>
      <StyledInput id={id} type='checkbox'></StyledInput>
      <StyledLabel htmlFor={id}></StyledLabel>
    </>
  );
};

const StyledInput = styled.input`
  display: none;

  & + label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 3px solid #707070;
    position: relative;
  }

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
`;

export default CheckBox;
