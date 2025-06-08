import { PropsWithChildren } from "react";
import { useCartDataContext } from "../contexts/CartDataContext";
import { useCartSelectionContext } from "../contexts/CartSelectionContext";

import * as Styled from "./CartContent.style";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";
import CheckBox from "@/components/common/CheckBox";
import Spinner from "@/components/common/Spinner";

interface CartContentRootProps extends PropsWithChildren {}

const CartContentRoot = ({ children }: CartContentRootProps) => {
  return <Styled.CartContentContainer>{children}</Styled.CartContentContainer>;
};

const CartContentLoading = () => {
  const { cartFetchLoading } = useCartDataContext();

  if (!cartFetchLoading) return null;

  return (
    <Styled.CartContentLoading>
      <Spinner size="large" />
    </Styled.CartContentLoading>
  );
};

const CartContentHeader = () => {
  const { cartItemsData } = useCartDataContext();
  const { isAllSelected, handleSelectAllCartItems } = useCartSelectionContext();

  return (
    <>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
      {cartItemsData.length !== 0 ? (
        <>
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
        </>
      ) : null}
    </>
  );
};

const CartContentItems = () => {
  const { cartItemsData } = useCartDataContext();
  const { selectedCartIds } = useCartSelectionContext();

  if (cartItemsData.length === 0) {
    return (
      <Styled.EmptyCartMessage>
        장바구니에 담긴 상품이 없습니다.
      </Styled.EmptyCartMessage>
    );
  }

  return (
    <CartList cartItemsData={cartItemsData} selectedCartIds={selectedCartIds}>
      <CartContentItemsList />
    </CartList>
  );
};

const CartContentItemsList = () => {
  const { cartItemsData } = useCartDataContext();
  const { selectedCartIds } = useCartSelectionContext();

  return (
    <>
      {cartItemsData.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={selectedCartIds.has(cartItem.id)}
        />
      ))}
    </>
  );
};

export {
  CartContentRoot,
  CartContentLoading,
  CartContentHeader,
  CartContentItems,
};
