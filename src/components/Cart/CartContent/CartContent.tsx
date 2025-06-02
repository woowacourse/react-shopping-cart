import { ReactNode } from "react";
import { useCartContext } from "../CartContext";
import * as Styled from "./CartContent.style";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";
import CheckBox from "@/components/common/CheckBox";
import Spinner from "../Spinner/Spinner";

// Root Component - props 없이 단순히 container 역할
interface CartContentRootProps {
  children: ReactNode;
}

const CartContentRoot = ({ children }: CartContentRootProps) => {
  return <Styled.CartContentContainer>{children}</Styled.CartContentContainer>;
};

// Loading Component
const CartContentLoading = () => {
  const { cartFetchLoading } = useCartContext();

  if (!cartFetchLoading) return null;

  return (
    <Styled.CartContentLoading>
      <Spinner size="large" />
    </Styled.CartContentLoading>
  );
};

// Header Component
const CartContentHeader = () => {
  const { cartItemsData, isAllSelected, handleSelectAllCartItems } =
    useCartContext();

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

// Content Component
const CartContentItems = () => {
  const { cartItemsData, subtotalPrice } = useCartContext();

  if (cartItemsData.length === 0) {
    return (
      <Styled.EmptyCartMessage>
        장바구니에 담긴 상품이 없습니다.
      </Styled.EmptyCartMessage>
    );
  }

  return (
    <CartList subtotalPrice={subtotalPrice}>
      <CartContentItemsList />
    </CartList>
  );
};

// Items List Component
const CartContentItemsList = () => {
  const {
    cartItemsData,
    handleDeleteCartItem,
    handleCartItemQuantity,
    handleSelectCartItem,
    selectedCartIds,
  } = useCartContext();

  return (
    <>
      {cartItemsData.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItem={cartItem}
          handleDeleteCartItem={handleDeleteCartItem}
          handleCartItemQuantity={handleCartItemQuantity}
          handleSelectCartItem={handleSelectCartItem}
          isSelected={selectedCartIds.has(cartItem.id)}
        />
      ))}
    </>
  );
};

const CartContentActions = () => {
  const { selectedCartItemsLength, onNext } = useCartContext();

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartItemsLength === 0}
      onClick={onNext}
    >
      주문 확인
    </Styled.OrderConfirmButton>
  );
};

function CartContent() {
  return (
    <CartContentRoot>
      <CartContentLoading />
      <CartContentHeader />
      <CartContentItems />
      <CartContentActions />
    </CartContentRoot>
  );
}

CartContent.Root = CartContentRoot;
CartContent.Loading = CartContentLoading;
CartContent.Header = CartContentHeader;
CartContent.Items = CartContentItems;
CartContent.Actions = CartContentActions;

export default CartContent;
