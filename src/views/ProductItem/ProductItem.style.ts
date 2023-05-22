import styled from 'styled-components';

export const ProductItemBox = styled.div`
  /*  height: 350px; */
  padding: 8px;
`;

export const ProductItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transition: ${(props) => props.theme.transitions.default};

  &:hover {
    transform: ${({ theme }) => theme.effects.hoverScale};
  }
`;

export const ProductItemImage = styled.img`
  width: 90%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.large};

  object-fit: cover;
`;

export const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  height: 10rem;

  align-items: center;
`;

export const ProductName = styled.div`
  font-size: 1.6rem;
  margin: 0.5rem 0;
  width: 100%;

  /* TODO: 변수표현해볼것 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ProductPrice = styled.div`
  font-size: 2rem;
  margin: 0.5rem 0;
`;

export const ProductInfo = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
