import styled from "styled-components";
import ProductQuantityInput from "../ProductQuantityInput/ProductQuantityInput";
interface ProductCardProps {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
}

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
        <QuantityInput productId={productId} />
        <ProductPrice>₩ {productPrice.toLocaleString()}</ProductPrice>
      </ProductDetailWrapper>
    </ProductCardContainer>
  );
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 358.03px;
  margin: 0 auto;
  background-color: #131313;
  border: 2px solid #202020;
  box-sizing: border-box;
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
  color: #dddddd;
`;

const ProductPrice = styled.span`
  font-size: 22px;
  padding-left: 10px;
  grid-area: price;
  color: #ffdf7e;
  font-family: "Prata";
`;

const QuantityInput = styled(ProductQuantityInput)`
  grid-area: input;
`;

export default ProductCard;
