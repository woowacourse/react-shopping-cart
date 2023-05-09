import styled from "styled-components";
import { AddCartIc } from "../../asset";

export function ProductItem() {
  return (
    <ProductItemContainer>
      <ProductImage />
      <InfoBox>
        <ProductInfo>
          <Name>밀크티(370ml)</Name>
          <Price>78,000원</Price>
        </ProductInfo>
        <AddCartButton>
          <AddCartIc />
        </AddCartButton>
      </InfoBox>
    </ProductItemContainer>
  );
}

const ProductItemContainer = styled.li`
  width: 28.2rem;
`;

const ProductImage = styled.img`
  width: 28.2rem;
  height: 28.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1.8rem 1rem 0;
`;

const ProductInfo = styled.div``;

const Name = styled.p`
  ${({ theme }) => theme.fonts.name}
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.price}
`;

const AddCartButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: transparent;
`;
