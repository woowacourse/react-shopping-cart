import styled from 'styled-components';
import PALETTE from '../../../../constants/palette';
import Container from '../../../shared/Container';
import List from '../../../shared/List';

export const StyledOrderItemListSection = styled(Container).attrs({ as: 'section' })`
  border: 1px solid ${PALETTE.GRAY[600]};
  margin: 3.5rem 0 4.5rem;
`;

export const OrderItemListHeader = styled(Container).attrs({ as: 'header' })`
  background-color: ${PALETTE.GRAY[200]};
  height: 5rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5rem;
  font-size: 1.25rem;
`;

export const OrderList = styled(List)`
  border-top: 2px solid ${PALETTE.GRAY[600]};
`;
