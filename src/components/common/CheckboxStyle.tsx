import { styled } from 'styled-components';

export const Checkbox = styled.input`
  all: unset;
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 14px;
  border: 1px solid var(--gray-color-200);
  cursor: pointer;

  &:checked {
    background: var(--gray-color-300);
  }

  &:checked::after {
    display: block;
    content: '';
    width: 17.99px;
    height: 10.06px;
    margin: 4px auto;
    border: 3px solid #ffffff;
    border-top: 0;
    border-right: 0;

    transform: rotate(-45deg);
  }

  @media (max-width: 548px) {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: 10px;

    &:checked::after {
      width: 12.99px;
      height: 5.06px;
      margin: 4px auto;
      border: 3px solid #ffffff;
      border-top: 0;
      border-right: 0;
    }
  }
`;
