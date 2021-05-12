import styled from 'styled-components';
import Card from '../../../../shared/Card';
import Container from '../../../../shared/Container';
import IconButton from '../../../../shared/IconButton';

export const ShoppingCartItemContainer = styled.li`
  display: flex;
  height: 10rem;
  padding: 1.5rem 0;

  ${Container} {
    align-items: flex-end;
    justify-content: space-evenly;
  }
`;

export const ShoppingCartItemCard = styled(Card)``;

ShoppingCartItemCard.defaultProps = {
  height: '9.125rem',
  width: '100%',
};

export const ProductName = styled.p`
  font-size: 1.25rem;
`;

export const DeleteButton = styled(IconButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

DeleteButton.defaultProps = {
  image: process.env.PUBLIC_URL + '/icons/trash-bin.svg',
};
