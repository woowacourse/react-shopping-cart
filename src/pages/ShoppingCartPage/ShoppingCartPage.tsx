import Header from "../../components/shoppingCart/Header/Header";
import Item from "../../components/shoppingCart/Item/Item";
import Receipt from "../../components/shoppingCart/receipt/Receipt";
import useCartItemList from "../../hooks/useCartItemList";

import { StyledShoppingCart, Flex, Checkbox } from "./ShoppingCartPage.styles";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();

  return (
    <StyledShoppingCart>
      <Header
        title="장바구니"
        description="현재 2종류의 상품이 담겨있습니다."
      />

      <section>
        <Flex>
          <Checkbox type="checkbox" id="checkBox" />
          <label htmlFor="checkBox">전체 선택</label>
        </Flex>
        {cartItemList?.map((item) => (
          <Item
            key={item.id}
            id={item.id}
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
