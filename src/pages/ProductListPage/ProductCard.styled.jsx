import styled from "styled-components";

const ProductCardContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border: 1px solid #ddd;

  cursor: pointer;
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  height: 278px;
  overflow: hidden;
`;

const ProductThumbnail = styled.img`
  width: 100%;
  transition: transform 0.3s;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductCardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  flex-grow: 1;
  padding: 0 12px;
`;

const ProductTextInfoContainer = styled.div`
  max-width: 70%;
`;

const ProductName = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.grey_darker};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.grey_darker};
`;

export {
  ProductCardContainer,
  ProductImageWrapper,
  ProductThumbnail,
  ProductCardBottom,
  ProductTextInfoContainer,
  ProductName,
  ProductPrice,
};
