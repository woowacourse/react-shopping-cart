import * as Styled from "./CartContent.style"
import useShoppingCart from "../../../hooks/useShoppingCart/useShoppingCart"
import CartList from "../CartList/CartList"
import CartCard from "../CartCard/CartCard"
import checked from "/checked.svg"
import unChecked from "/unChecked.svg"
import useSelectedCartIds from "../../../hooks/useSelectedCartIds"
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton"
import OrderSummary from "../OrderSummary/OrderSummary"

function CartContent() {
  const {
    cartItemsData,
    handleCartItemQuantity,
    handleDeleteCartItem,
    isQuantityUpdateLoading,
    isDeleteItemLoading,
  } = useShoppingCart()

  const {
    selectedCartIds,
    isAllSelected,
    handleRemoveSelectCartItem,
    handleAddSelectCartItem,
    handleSelectAllCartItems,
  } = useSelectedCartIds(cartItemsData)

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
              onClick={() => handleSelectAllCartItems(isAllSelected)}
              type="button"
              aria-label={isAllSelected ? "전체 선택 해제" : "전체 선택"}
            >
              <Styled.SelectIcon
                src={isAllSelected ? checked : unChecked}
                alt={isAllSelected ? "전체 선택됨" : "전체 선택 안 됨"}
              />
            </Styled.SelectButton>
            <p>전체선택</p>
          </Styled.AllSelectWrapper>
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
        </>
      ) : (
        <Styled.EmptyCartMessage>
          장바구니에 담긴 상품이 없습니다.
        </Styled.EmptyCartMessage>
      )}
      <OrderConfirmButton
        selectedCartIds={selectedCartIds}
        cartItemsData={cartItemsData}
      />
    </Styled.CartContentContainer>
  )
}

export default CartContent
