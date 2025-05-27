import Header from "../Header/Header";
import { StyledShoppingCart } from "./ShoppingCart.styles";

export default function ShoppingCart() {
  return (
    <StyledShoppingCart>
      <Header
        title="장바구니"
        description="현재 2종류의 상품이 담겨있습니다."
      />
    </StyledShoppingCart>
  );
}
