import styled from 'styled-components';
import Card from '../../../shared/Card';
import Container from '../../../shared/Container';

export const OrderItemCard = styled(Card)`
  box-sizing: content-box;
  padding: 1.5rem 0;
`;

OrderItemCard.defaultProps = {
  height: '7.5rem',
  width: '100%',
};

export const ProductName = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;
