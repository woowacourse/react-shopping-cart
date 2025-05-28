import { useEffect, useState } from "react";

import Header from "../../components/shoppingCart/Header/Header";
import Item from "../../components/shoppingCart/Item/Item";
import Receipt from "../../components/shoppingCart/receipt/Receipt";

import useCartItemList from "../../hooks/useCartItemList";

import { CartItemCheck } from "../../types/CartItemCheck";

import { StyledShoppingCart, Flex, Checkbox } from "./ShoppingCartPage.styles";

export default function ShoppingCartPage() {
  const { state, cartItemList } = useCartItemList();
  const [cartItemCheckList, setCartItemCheckList] = useState<CartItemCheck[]>(
    []
  );

  useEffect(() => {
    setCartItemCheckList(
      cartItemList.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.product.price,
        isClicked: true,
      }))
    );
  }, [state.isLoading]);

  const handleSelectedCartItem = (id: number) => {
    setCartItemCheckList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isClicked: !item.isClicked } : item
      )
    );
  };

  const allChecked = cartItemCheckList.every((item) => item.isClicked);

  const toggleAll = () => {
    setCartItemCheckList((prev) =>
      prev.map((item) => ({ ...item, isClicked: !allChecked }))
    );
  };

  return (
    <StyledShoppingCart>
      <Header
        title="장바구니"
        description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`}
      />

      <section>
        <Flex>
          <Checkbox type="checkbox" checked={allChecked} onChange={toggleAll} />
          <label>전체 선택</label>
        </Flex>

        {cartItemList.map((cart) => {
          const selected = cartItemCheckList.find((s) => s.id === cart.id);
          return (
            <Item
              key={cart.id}
              id={cart.id}
              isChecked={!!selected?.isClicked}
              handleSelectedCartItem={handleSelectedCartItem}
              imageUrl={cart.product.imageUrl}
              name={cart.product.name}
              price={cart.product.price}
              quantity={cart.quantity}
            />
          );
        })}
      </section>

      <Receipt cartItemCheckList={cartItemCheckList} />
    </StyledShoppingCart>
  );
}
