import styled from 'styled-components';
import { ReactComponent as Check } from 'assets/images/check.svg';

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  width: fit-content;
  cursor: pointer;

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  svg {
    position: absolute;
    left: 2px;
  }
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.PALETTE.WHITE_001};
  border: 1px solid ${({ theme }) => theme.PALETTE.MINT_002};
  border-radius: 2px;

  &:checked {
    background-color: ${({ theme }) => theme.PALETTE.MINT_002};
  }
`;

function Checkbox({ children }) {
  return (
    <Container>
      <StyledCheckbox />
      <Check />
      {children}
    </Container>
  );
}

export default Checkbox;
