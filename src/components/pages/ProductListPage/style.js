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

export const ProductName = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
`;

export const CartButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
