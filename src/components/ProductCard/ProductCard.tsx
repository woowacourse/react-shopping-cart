import styled from "styled-components";
import ProductQuantityInput from "../ProductQuantityInput/ProductQuantityInput";
interface ProductCardProps {
  productImage: string;
  productName: string;
  productPrice: number;
}

const ProductCard = ({
  productImage,
  productName,
  productPrice,
}: ProductCardProps) => {
  return (
    <ProductCardContainer>
      <ProductImage src={productImage} alt="productImage" />
      <ProductDetailWrapper>
        <ProductName title={productName}>{productName}</ProductName>
        <QuantityInput />
        <ProductPrice>{productPrice.toLocaleString()} 원</ProductPrice>
      </ProductDetailWrapper>
    </ProductCardContainer>
  );
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 358.03px;
`;

const ProductImage = styled.img`
  width: 282px;
  height: 282px;
`;

const ProductDetailWrapper = styled.div`
  flex-grow: 1;
  padding: 10px 5px 5px 5px;
  display: grid;
  grid-template-rows: 3fr 4fr;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    "name input"
    "price price";
`;

const ProductName = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 10px;
  grid-area: name;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  padding-left: 10px;
  grid-area: price;
`;

const QuantityInput = styled(ProductQuantityInput)`
  grid-area: input;
`;

export default ProductCard;
