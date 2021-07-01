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
`;

export const CartButtonInner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  transition: width 0.2s;
  background-color: ${({ quantity }) => (quantity && quantity > 0 ? PALETTE.BAEMINT : PALETTE.WHITE)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${PALETTE.WHITE};
  box-shadow: 1px 1px 3px 1px ${PALETTE.GRAY_003};
  ${({ isOpen }) => isOpen && openCSS}
`;

export const Quantity = styled.div`
  width: 2.5rem;
  height: inherit;
  border-radius: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
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
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};

  svg {
    width: 1.5rem;
    fill: ${PALETTE.BAEMINT};
  }
`;
