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
      <ProductName theme={nameTheme} name={name} />
      <ProductPrice theme={priceTheme} price={price} />
    </Styled.ProductInfo>
  );
};

const nameTheme = {
  width: "197px",
  height: "42px",
  fontSize: "16px",
};

const priceTheme = {
  alignSelf: "auto",
  fontWeight: "Regular",
  fontSize: "20px",
};
export default memo(ProductInfo);
