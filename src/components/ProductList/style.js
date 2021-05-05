import Styled from 'styled-components';

export const ProductList = Styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2.5rem;
`;

export const ProductInfoContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-top: 1rem;
`;

export const ProductInfo = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProductName = Styled.p`
  font-size: 1rem;
`;

export const ProductPrice = Styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

export const CartButton = Styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
