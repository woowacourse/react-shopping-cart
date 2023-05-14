import { memo } from "react";
import Styled from "./ProductInfoStyled";

interface ProductInfoProps {
  name: String;
  price: number;
}
const ProductInfo = ({ name, price }: ProductInfoProps) => {
  return (
    <Styled.ProductInfo>
      <Styled.ProductName>{name}</Styled.ProductName>
      <Styled.ProductPrice>{price.toLocaleString()}원</Styled.ProductPrice>
    </Styled.ProductInfo>
  );
};

export default memo(ProductInfo);
