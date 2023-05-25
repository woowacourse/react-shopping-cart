import { memo } from "react";
import Styled from "./ProductNameStyled";

interface ProductNameProps {
  name: string;
}

const ProductName = ({ name }: ProductNameProps) => {
  return <Styled.Name>{name}</Styled.Name>;
};

export default memo(ProductName);
