import { styled } from 'styled-components';

export const CheckBox = () => {
  return <StyledCheckBoxInput type="checkbox"></StyledCheckBoxInput>;
};

const StyledCheckBoxInput = styled.input`
  width: 28px;
  height: 28px;
  background-color: var(--white-color);
  border: 1px solid var(--label-color);
  border-radius: 2px;
`;
