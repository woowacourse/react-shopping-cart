import styled from "styled-components";

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
      <ProductName>{productName}</ProductName>
      <ProductPrice>{productPrice.toLocaleString()} 원</ProductPrice>
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
  margin-bottom: 20px;
`;

const ProductName = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
  padding-left: 10px;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  padding-left: 10px;
`;

export default ProductCard;
