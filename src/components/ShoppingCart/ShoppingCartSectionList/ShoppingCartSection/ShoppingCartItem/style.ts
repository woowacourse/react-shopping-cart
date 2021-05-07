import styled from 'styled-components';
import Container from '../../../../shared/Container';

export const ShoppingCartItemContainer = styled.li`
  display: flex;
  height: 10rem;
  padding: 1.5rem 0;

  ${Container} {
    align-items: flex-end;
    justify-content: space-evenly;
  }
`;

export const ProductName = styled.p`
  font-size: 1.25rem;
`;
