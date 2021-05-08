import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Container from '../../shared/Container';
import { OrderItemCard } from './OrderItem/style';

export const OrderItemListContainer = styled(Container)`
  width: 46rem;
`;

export const ItemList = styled.ul`
  border-top: 4px solid ${PALETTE.GRAY[600]};

  ${OrderItemCard} {
    border-bottom: 1.5px solid ${PALETTE.GRAY[400]};
  }

  ${OrderItemCard}:last-child {
    border-bottom: none;
  }
`;

export const InnerTitle = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.75rem;
`;
