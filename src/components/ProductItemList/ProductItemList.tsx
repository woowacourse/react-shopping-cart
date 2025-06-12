import { Container } from "./ProductItemList.styles";

interface ProductItemListProps {
  children: React.ReactNode;
}

function ProductItemList({ children }: ProductItemListProps) {
  return <ul css={Container}>{children}</ul>;
}

export default ProductItemList;
