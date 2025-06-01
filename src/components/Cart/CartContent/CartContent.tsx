import { useState } from "react";
import { useNavigate } from "react-router";
import * as Styled from "./CartContent.style";
import useShoppingCart from "@/hooks/Cart/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";

import { PAGE_URL } from "@/constants/PageUrl";
import type { OrderConfirmationLocationState } from "@/type/OrderConfirmation";

import Spinner from "../Spinner/Spinner";
import { useCalculateOrder } from "@/hooks/useCalculateOrder";
import CheckBox from "@/components/common/CheckBox";
import useLocalStorage from "@/hooks/Cart/useLocalStorage";

function CartContent() {
  const {
    cartItemsData,
    handleCartItemQuantity,
    handleDeleteCartItem,
    isQuantityUpdateLoading,
    isDeleteItemLoading,
    cartFetchLoading,
  } = useShoppingCart();

  const [selectedCartIds, setSelectedCartIds] = useState<
    Set<string> | undefined
  >(undefined);
  const navigate = useNavigate();
  useLocalStorage({ cartItemsData, selectedCartIds, setSelectedCartIds });

  const handleSelectCartItem = (id: string) => {
    if (!selectedCartIds) {
      setSelectedCartIds(new Set([id]));
      return;
    }
    if (selectedCartIds.has(id)) {
      setSelectedCartIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      setSelectedCartIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    }
  };

  const handleSelectAllCartItems = () =>
    setSelectedCartIds((prev) => {
      if (!prev) {
        return new Set(cartItemsData.map((item) => item.id));
      }
      if (prev.size === cartItemsData.length) {
        return new Set();
      }
      return new Set(cartItemsData.map((item) => item.id));
    });
  const {
    selectedCartItemsCount,
    selectedCartItemsLength,
    isAllSelected,
    finalPrice,
    subtotalPrice,
  } = useCalculateOrder(cartItemsData, selectedCartIds);
  const handleOrderConfirm = () => {
    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength,
      selectedCartItemsCount,
      finalPrice,
    };
    navigate(PAGE_URL.ORDER_COMPLETE, { state });
  };
  if (cartFetchLoading) {
    return (
      <Styled.CartContentContainer>
        <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
        <Styled.CartContentLoading>
          <Spinner size="large" />
        </Styled.CartContentLoading>
      </Styled.CartContentContainer>
    );
  }
  if (cartItemsData.length === 0) {
    return (
      <Styled.CartContentContainer>
        <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
        <Styled.EmptyCartMessage>
          장바구니에 담긴 상품이 없습니다.
        </Styled.EmptyCartMessage>
        <Styled.OrderConfirmButton
          disabled={selectedCartItemsLength === 0}
          onClick={handleOrderConfirm}
        >
          주문 확인
        </Styled.OrderConfirmButton>
      </Styled.CartContentContainer>
    );
  }

  return (
    <Styled.CartContentContainer>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
      <Styled.CartContentDescription>
        현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
      </Styled.CartContentDescription>
      <Styled.AllSelectWrapper>
        <CheckBox
          id="select-all-checkbox"
          checked={isAllSelected}
          onChange={handleSelectAllCartItems}
          label="전체선택"
          boxSize="medium"
        />
      </Styled.AllSelectWrapper>
      <CartList subtotalPrice={subtotalPrice}>
        {cartItemsData.length > 0 &&
          cartItemsData.map((cartItem) => (
            <CartCard
              key={cartItem.id}
              cartItem={cartItem}
              handleDeleteCartItem={handleDeleteCartItem}
              isDeleteItemLoading={isDeleteItemLoading}
              isQuantityUpdateLoading={isQuantityUpdateLoading}
              handleCartItemQuantity={handleCartItemQuantity}
              handleSelectCartItem={handleSelectCartItem}
              isSelected={selectedCartIds?.has(cartItem.id) || false}
            />
          ))}
      </CartList>
      <Styled.OrderConfirmButton
        disabled={selectedCartItemsLength === 0}
        onClick={handleOrderConfirm}
      >
        주문 확인
      </Styled.OrderConfirmButton>
    </Styled.CartContentContainer>
  );
}

export default CartContent;
