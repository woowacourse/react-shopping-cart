import * as Styled from "./CartContent.style";
import useShoppingCart from "../../../hooks/useShoppingCart/useShoppingCart";
import CartList from "../CartList/CartList";
import CartCard from "../CartCard/CartCard";

import useSelectedCartIds from "../../../hooks/useSelectedCartIds";
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton";
import OrderSummary from "../OrderSummary/OrderSummary";
import { EmptyCartContent } from "../EmptyCartContent/EmptyCartContent";
import AllCheckBox from "../AllCheckBox/AllCheckBox";

function CartContent() {
  const {
    cartItemsData,
    handleCartItemQuantity,
    handleDeleteCartItem,
    isQuantityUpdateLoading,
    isDeleteItemLoading,
  } = useShoppingCart();

  const {
    selectedCartIds,
    isAllSelected,
    handleRemoveSelectCartItem,
    handleAddSelectCartItem,
    handleSelectAllCartItems,
  } = useSelectedCartIds(cartItemsData);

  return (
    <Styled.CartContentContainer>
      <Styled.CartContentHeader>장바구니</Styled.CartContentHeader>

      {cartItemsData.length !== 0 ? (
        <>
          <Styled.CartContentDescription>
            현재 {cartItemsData.length}종류의 상품이 담겨있습니다.
          </Styled.CartContentDescription>
          <AllCheckBox
            isAllSelected={isAllSelected}
            handleToggleAllSelection={handleSelectAllCartItems}
          />
          <CartList>
            {cartItemsData.map((cartItem) => (
              <CartCard
                key={cartItem.id}
                cartItem={cartItem}
                handleDeleteCartItem={handleDeleteCartItem}
                isDeleteItemLoading={isDeleteItemLoading}
                isQuantityUpdateLoading={isQuantityUpdateLoading}
                handleCartItemQuantity={handleCartItemQuantity}
                handleRemoveSelectCartItem={handleRemoveSelectCartItem}
                handleAddSelectCartItem={handleAddSelectCartItem}
                isSelected={selectedCartIds.includes(cartItem.id)}
              />
            ))}
          </CartList>
          <OrderSummary
            cartItemsData={cartItemsData}
            selectedCartIds={selectedCartIds}
          />
          <OrderConfirmButton
            selectedCartIds={selectedCartIds}
            cartItemsData={cartItemsData}
          />
        </>
      ) : (
        <EmptyCartContent />
      )}
    </Styled.CartContentContainer>
  );
}

export default CartContent;
