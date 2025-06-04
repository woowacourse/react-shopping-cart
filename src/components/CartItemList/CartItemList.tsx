import { Container } from "./CartItemList.styles";

interface CartItemListProps {
  children: React.ReactNode;
}

function CartItemList({ children }: CartItemListProps) {
  return <section css={Container}>{children}</section>;
}

export default CartItemList;
