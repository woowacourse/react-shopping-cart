import styled from 'styled-components';
import PALETTE from '../../../../constants/palette';
import { ShoppingCartItemContainer } from './ShoppingCartItem/style';

export const ItemList = styled.ul`
  border-top: 4px solid ${PALETTE.GRAY[600]};

  ${ShoppingCartItemContainer} {
    border-bottom: 1.5px solid ${PALETTE.GRAY[400]};
  }

  ${ShoppingCartItemContainer}:last-child {
    border-bottom: none;
  }
`;

export const InnerTitle = styled.h3`
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
`;
