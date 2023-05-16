import { memo } from "react";
import Styled from "./ProductPriceStyled";

interface ProductPriceProps {
  price: number;
}

const ProductPrice = ({ price }: ProductPriceProps) => {
  return <Styled.Price>{price.toLocaleString()}원</Styled.Price>;
};

export default memo(ProductPrice);
