import {ProductItem} from "../types/types.ts";
import CartController from "./CartController";
import styled from "styled-components";

export const ProductItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 10px;

  @media screen and (min-width: ${({theme}) => theme.breakpoints.md}) {
    width: 50%;
  }
`;

export const ProductItemImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
`;

export const ProductDetails = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media screen and (min-width: ${({theme}) => theme.breakpoints.md}) {
    width: 50%;
    padding: 0px 10px;
  }
`;

export const ProductModalContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const ProductName = styled.div`
  font-size: 20px;
`;
export const ProductPrice = styled.div`
  font-size: 28px;
`;

function ProductModalContent({product}: { product: ProductItem }) {
  const {name, price, imageUrl} = product;
  return (
    <ProductModalContentWrapper>
      <ProductItemImageBox>
        <ProductItemImage src={imageUrl}/>
      </ProductItemImageBox>
      <ProductDetails>
        <div>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        </div>
        <CartController product={product}/>
      </ProductDetails>
    </ProductModalContentWrapper>
  );
}

export default ProductModalContent;
