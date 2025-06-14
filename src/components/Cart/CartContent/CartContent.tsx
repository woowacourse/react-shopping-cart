import * as Styled from "./CartContent.style";
import useShoppingCart from "../../../hooks/cart/useShoppingCart/useShoppingCart";
import OrderContent from "../OrderContent/OrderContent";
import EmptyCartContent from "../EmptyCartContent/EmptyCartContent";

function CartContent() {
  const {
    cartItemsData,
    handleCartItemQuantity,
    handleDeleteCartItem,
    isQuantityUpdateLoading,
    isDeleteItemLoading,
  } = useShoppingCart();

  return (
    <Styled.CartContentContainer>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>
      {cartItemsData.length !== 0 ? (
        <OrderContent
          cartItemsData={cartItemsData}
          handleCartItemQuantity={handleCartItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
          isQuantityUpdateLoading={isQuantityUpdateLoading}
          isDeleteItemLoading={isDeleteItemLoading}
        />
      ) : (
        <EmptyCartContent />
      )}
    </Styled.CartContentContainer>
  );
}

export default CartContent;
