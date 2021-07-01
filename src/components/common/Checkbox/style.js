import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

export const CheckboxContainer = styled.label`
  display: flex;
  font-size: 1rem;
  ${({ align }) => align && `align-items: ${align};`}
`;

export const Checkbox = styled.input`
  appearance: none;
  cursor: pointer;
  position: relative;
  margin-right: 1rem;
  outline: none;

  &:before {
    width: 1.75rem;
    height: 1.75rem;
    content: '';
    display: block;
    border-radius: 3px;
    border: 1px solid ${PALETTE.BAEMINT};
  }
  &:checked:before {
    background-color: ${PALETTE.BAEMINT};
  }
  &:checked:after {
    width: 1.2rem;
    height: 0.5rem;
    display: block;
    content: '';
    border-width: 0 0 3px 3px;
    border-style: solid;
    border-color: ${PALETTE.WHITE};
    transform: rotate(-45deg);
    position: absolute;
    top: 0.45rem;
    left: 0.25rem;
  }
`;
