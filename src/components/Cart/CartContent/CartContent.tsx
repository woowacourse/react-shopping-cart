import { useEffect, useRef, useState } from "react";
import * as Styled from "./CartContent.style";
import useShoppingCart from "../../../hooks/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";

function CartContent() {
  const {
    cartItemsData,
    handleCartItemQuantity,
    handleDeleteCartItem,
    isQuantityUpdateLoading,
    isDeleteItemLoading,
  } = useShoppingCart();

  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && cartItemsData.length) {
      const allIds = cartItemsData.map((item) => item.id.toString());
      setSelectedCartIds(allIds);
      initialized.current = true;
    }
  }, [cartItemsData]);

  const handleSelectCartItem = (id: string) => {
    if (selectedCartIds.includes(id)) {
      setSelectedCartIds((prev) => prev.filter((cartId) => cartId !== id));
    } else {
      setSelectedCartIds((prev) => [...prev, id]);
    }
  };

  return (
    <Styled.CartContentContainer>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
      <Styled.CartContentDescription>
        현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
      </Styled.CartContentDescription>
      <div
        onClick={() => {
          if (selectedCartIds.length === cartItemsData.length) {
            setSelectedCartIds([]);
          } else {
            const allIds = cartItemsData.map((item) => item.id.toString());
            setSelectedCartIds(allIds);
          }
        }}
      >
        전체선택
      </div>
      <CartList cartItemsData={cartItemsData} selectedCartIds={selectedCartIds}>
        {cartItemsData.map((cartItem) => (
          <CartCard
            key={cartItem.id}
            cartItem={cartItem}
            handleDeleteCartItem={() =>
              handleDeleteCartItem(String(cartItem.id))
            }
            isDeleteItemLoading={isDeleteItemLoading}
            isQuantityUpdateLoading={isQuantityUpdateLoading}
            handleCartItemQuantity={handleCartItemQuantity}
            handleSelectCartItem={handleSelectCartItem}
            isSelected={selectedCartIds.includes(cartItem.id.toString())}
          />
        ))}
      </CartList>
    </Styled.CartContentContainer>
  );
}

export default CartContent;
