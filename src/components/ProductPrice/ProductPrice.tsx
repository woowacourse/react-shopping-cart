import { memo } from "react";
import Styled from "./ProductPriceStyled";

interface ProductPriceProps {
  price: number;
  theme: object;
}

const ProductPrice = ({ price, theme }: ProductPriceProps) => {
  return <Styled.Price theme={theme}>{price.toLocaleString()}원</Styled.Price>;
};

export default memo(ProductPrice);
