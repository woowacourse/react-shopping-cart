import styled from "styled-components";
import ProductQuantityInput from "../TransformQuantityInput/TransformQuantityInput";
import type { ProductCardProps } from "../../types";

const ProductCard = ({
  productId,
  productImage,
  productName,
  productPrice,
}: ProductCardProps) => {
  return (
    <ProductCardContainer>
      <ProductImage src={productImage} alt="productImage" />
      <ProductDetailWrapper>
        <ProductName title={productName}>{productName}</ProductName>
        <InputWrapper>
          <ProductQuantityInput productId={productId} />
        </InputWrapper>
        <ProductPrice>₩ {productPrice.toLocaleString()}</ProductPrice>
      </ProductDetailWrapper>
    </ProductCardContainer>
  );
};

const colors = {
  slightDarkWhite: "#ddd",
  gold: "#ffdf7e",
  slightLightBlack: "#131313",
  darkGray: "#222",
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 358.03px;
  margin: 0 auto;
  background-color: ${colors.slightLightBlack};
  border: 2px solid ${colors.darkGray};
  box-sizing: border-box;
  transition: 0.3s;
`;

const ProductImage = styled.img`
  width: 280px;
  height: 280px;
`;

const ProductDetailWrapper = styled.div`
  flex-grow: 1;
  padding: 10px 5px 5px 5px;
  display: grid;
  grid-template-rows: 3fr 4fr;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    "name input"
    "price input";
`;

const ProductName = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 10px;
  grid-area: name;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.slightDarkWhite};
`;

const ProductPrice = styled.span`
  font-size: 22px;
  padding-left: 10px;
  grid-area: price;
  color: ${colors.gold};
  font-family: "Prata";
`;

const InputWrapper = styled.div`
  grid-area: input;
  display: flex;
  justify-content: center;
`;

export default ProductCard;
