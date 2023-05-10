import styled from "styled-components";

interface ProductCardProps {
  productImage: string;
  proudctName: string;
  productPrice: number;
}

const ProductCard = ({
  productImage,
  proudctName,
  productPrice,
}: ProductCardProps) => {
  return (
    <ProductCardContainer>
      <ProductImage src={productImage} alt="productImage" />
      <ProductName>{proudctName}</ProductName>
      <ProductPrice>{productPrice.toLocaleString()} 원</ProductPrice>
    </ProductCardContainer>
  );
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 358.03px;
  border: 1px solid red;
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
