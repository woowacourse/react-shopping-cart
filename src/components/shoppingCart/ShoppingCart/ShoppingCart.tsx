import Header from "../Header/Header";
import Item from "../Item/Item";
import Receipt from "../receipt/Receipt";
import useCartItemList from "../../../hooks/UseCartItemList";

import { StyledShoppingCart } from "./ShoppingCart.styles";

export default function ShoppingCart() {
  const { state, cartItemList } = useCartItemList();
  console.log("state:", state);
  console.log("cartItemList:", cartItemList);

  return (
    <StyledShoppingCart>
      <Header
        title="장바구니"
        description="현재 2종류의 상품이 담겨있습니다."
      />
      <section>
        {cartItemList?.map((item) => (
          <Item
            key={item.id}
            imageUrl={item.product.imageUrl}
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
          />
        ))}
      </section>
      <Receipt />
    </StyledShoppingCart>
  );
}
