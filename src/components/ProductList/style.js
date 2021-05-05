import styled from 'styled-components';

export const ProductList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  li {
    min-width: 0;
    min-height: 0;
  }
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-top: 1rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProductName = styled.p`
  font-size: 1rem;
`;

export const ProductPrice = styled.p`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

export const CartButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
