import { useEffect, useRef, useState } from "react";
import * as Styled from "./CartContent.style";
import useShoppingCart from "../../../hooks/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";
import checked from "/checked.svg";
import unChecked from "/unChecked.svg";

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

      {cartItemsData.length !== 0 ? (
        <>
          <Styled.CartContentDescription>
            현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
          </Styled.CartContentDescription>
          <Styled.AllSelectWrapper>
            <Styled.SelectButton
              onClick={() => {
                if (selectedCartIds.length === cartItemsData.length) {
                  setSelectedCartIds([]);
                } else {
                  const allIds = cartItemsData.map((item) =>
                    item.id.toString()
                  );
                  setSelectedCartIds(allIds);
                }
              }}
            >
              <Styled.SelectIcon
                src={
                  cartItemsData.length === selectedCartIds.length
                    ? checked
                    : unChecked
                }
              />
            </Styled.SelectButton>
            <p>전체선택</p>
          </Styled.AllSelectWrapper>
          <CartList
            cartItemsData={cartItemsData}
            selectedCartIds={selectedCartIds}
          >
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
        </>
      ) : (
        <Styled.EmptyCartMessage>
          장바구니에 담긴 상품이 없습니다.
        </Styled.EmptyCartMessage>
      )}
      <Styled.OrderConfirmButton disabled={selectedCartIds.length === 0}>
        주문 확인
      </Styled.OrderConfirmButton>
    </Styled.CartContentContainer>
  );
}

export default CartContent;
