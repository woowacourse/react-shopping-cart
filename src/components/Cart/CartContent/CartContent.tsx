import { useEffect, useRef, useState } from "react";
import * as Styled from "./CartContent.style";
import useShoppingCart from "../../../hooks/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";
import checked from "/checked.svg";
import unChecked from "/unChecked.svg";
import { useNavigate } from "react-router";
import { PAGE_URL } from "../../../constants/PageUrl";
import type { OrderConfirmationLocationState } from "../../../type/OrderConfirmation";

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
  const navigate = useNavigate();

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

  const isAllSelected =
    cartItemsData.length > 0 &&
    cartItemsData.every((item) => selectedCartIds.includes(item.id.toString()));

  const handleOrderConfirm = () => {
    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength: selectedCartIds.length,
      selectedCartItemsCount: cartItemsData
        .filter((cartItem) => selectedCartIds.includes(cartItem.id.toString()))
        .reduce((totalCount, item) => totalCount + item.quantity, 0),
      totalPrice: cartItemsData
        .filter((item) => selectedCartIds.includes(item.id.toString()))
        .reduce((total, item) => total + item.product.price * item.quantity, 0),
    };
    navigate(PAGE_URL.ORDER_CONFIRMATION, { state });
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
              <Styled.SelectIcon src={isAllSelected ? checked : unChecked} />
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
                handleDeleteCartItem={handleDeleteCartItem}
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
      <Styled.OrderConfirmButton
        disabled={selectedCartIds.length === 0}
        onClick={handleOrderConfirm}
      >
        주문 확인
      </Styled.OrderConfirmButton>
    </Styled.CartContentContainer>
  );
}

export default CartContent;
