import { styled } from 'styled-components';

export const CheckBox = () => {
  return <StyledCheckBox></StyledCheckBox>;
};

const StyledCheckBox = styled.div`
  width: 28px;
  height: 28px;
  background-color: var(--white-color);
  border: 1px solid var(--label-color);
  border-radius: 2px;
`;
