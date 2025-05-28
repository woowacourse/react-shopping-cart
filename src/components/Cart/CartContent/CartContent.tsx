import styled from "@emotion/styled";
import useShoppingCart from "../../../hooks/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";

function CartContent() {
  const {
    cartItemsData,
    isQuantityUpdateLoading,
    handleCartItemQuantity,
    isDeleteItemLoading,
    handleDeleteCartItem,
  } = useShoppingCart();

  return (
    <CartContentContainer>
      <CartContentHeader>장바구니</CartContentHeader>
      <CartContentDescription>
        현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
      </CartContentDescription>
      <CartList cartItemsData={cartItemsData}>
        {cartItemsData.map((cartItem) => (
          <CartCard
            key={cartItem.id}
            cartItem={cartItem}
            handleDeleteCartItem={() =>
              handleDeleteCartItem(String(cartItem.id))
            }
            handleCartItemQuantity={handleCartItemQuantity}
          />
        ))}
      </CartList>
    </CartContentContainer>
  );
}

export default CartContent;

const CartContentContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  margin-top: 64px;
  justify-content: flex-start;
`;

const CartContentHeader = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

const CartContentDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
`;
