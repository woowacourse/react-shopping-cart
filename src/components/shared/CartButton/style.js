import styled, { css } from 'styled-components';
import PALETTE from '../../../constants/palette';

export const CartButtonContainer = styled.div`
  width: 9rem;
  display: flex;
  justify-content: flex-end;
`;

const openCSS = css`
  width: 100%;
  background-color: ${PALETTE.WHITE};
  color: ${PALETTE.BLACK};

  button {
    display: flex;
  }
`;

export const CartButtonInner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  transition: width 0.2s;
  background-color: ${({ amount }) => (amount && amount > 0 ? PALETTE.BAEMINT : PALETTE.WHITE)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${PALETTE.WHITE};
  box-shadow: 1px 1px 3px 1px ${PALETTE.GRAY_003};

  ${({ isOpen }) => isOpen && openCSS}
`;

export const Amount = styled.div`
  width: 2.5rem;
  height: inherit;
  border-radius: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  color: inherit;
`;

export const IconButton = styled.button`
  width: 2.5rem;
  height: inherit;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isHidden }) => isHidden && 'display: none;'}

  svg {
    width: 1.5rem;
    fill: ${PALETTE.BAEMINT};
  }
`;
