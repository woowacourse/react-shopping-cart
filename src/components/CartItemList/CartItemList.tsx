import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  children: React.ReactNode;
}

function CartItemList({ children }: CartItemListProps) {
  return <ul css={Container}>{children}</ul>;
}

export default CartItemList;
