import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  height: fit-content;

  input[type='checkbox'] {
    appearance: none;
    position: relative;
    margin-right: 0.75rem;

    &::before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      width: 1.75rem;
      height: 1.75rem;
      border: 1px solid ${PALETTE.BAE_MINT[500]};
      border-radius: 2px;
    }

    &:checked::before {
      background-color: ${PALETTE.BAE_MINT[500]};
    }

    &:checked::after {
      content: '';
      display: block;
      width: 0.75rem;
      height: 1.25rem;
      border-bottom: 6px solid white;
      border-right: 6px solid white;
      border-radius: 4px;
      transform: rotate(45deg);
      position: absolute;
      left: 0.375rem;
      top: -0.25rem;
    }
  }
`;
