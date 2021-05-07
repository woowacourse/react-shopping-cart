import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../shared/Button';
import Container from '../../shared/Container';

export const ShoppingCartItemListContainer = styled(Container)`
  width: 46rem;
`;

export const SelectedItemDeleteButton = styled(Button)`
  width: 7.25rem;
  height: 3.125rem;
  border: 1px solid ${PALETTE.GRAY[500]};
`;

export const CartSelectContainer = styled(Container)`
  height: 3.125rem;
  margin-bottom: 1.75rem;
`;

CartSelectContainer.defaultProps = {
  direction: 'row',
  justifyContent: 'space-between',
};
