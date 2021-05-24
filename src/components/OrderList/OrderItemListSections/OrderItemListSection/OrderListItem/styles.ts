import styled from 'styled-components';
import PALETTE from '../../../../../constants/palette';
import Button from '../../../../shared/Button';
import Card from '../../../../shared/Card';

export const StyledOrderItemListItem = styled.li`
  display: flex;
  padding: 1.5rem 1.625rem;
`;

export const OrderListItemCard = styled(Card)`
  img,
  p {
    cursor: pointer;
  }
`;

OrderListItemCard.defaultProps = {
  height: '9.125rem',
  width: '100%',
};

export const ProductName = styled.p`
  font-size: 1.25rem;
`;

export const AddCartButton = styled(Button)`
  background-color: ${PALETTE.BAE_MINT[500]};
  color: white;
`;
