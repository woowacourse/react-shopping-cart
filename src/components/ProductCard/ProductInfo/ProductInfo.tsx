import { memo } from "react";
import ProductName from "../../ProductName/ProductName";
import ProductPrice from "../../ProductPrice/ProductPrice";
import Styled from "./ProductInfoStyled";

interface ProductInfoProps {
  name: string;
  price: number;
}
const ProductInfo = ({ name, price }: ProductInfoProps) => {
  return (
    <Styled.ProductInfo>
      <ProductName name={name} />
      <ProductPrice price={price} />
    </Styled.ProductInfo>
  );
};

export default memo(ProductInfo);
