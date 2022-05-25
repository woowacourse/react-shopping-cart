import styled from 'styled-components';

const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.colors['MINT_001']};
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors['MINT_001']};
  }

  &:after {
    content: '✔';
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors['WHITE_001']};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors['GRAY_001']};
    cursor: auto;
    border: none;

    &:after {
      content: '';
    }
  }
`;

export default CheckBox;
