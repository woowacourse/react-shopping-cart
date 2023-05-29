import { memo } from "react";
import Styled from "./ProductNameStyled";

interface ProductNameProps {
  name: string;
  theme: object;
}

const ProductName = ({ name, theme }: ProductNameProps) => {
  return <Styled.Name theme={theme}>{name}</Styled.Name>;
};

export default memo(ProductName);
