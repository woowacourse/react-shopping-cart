import * as Styled from "./CartContent.style"
import useShoppingCart from "../../../hooks/useShoppingCart/useShoppingCart"
import CartList from "../CartList/CartList"
import CartCard from "../CartCard/CartCard"
import checked from "/checked.svg"
import unChecked from "/unChecked.svg"
import useSelectedCartIds from "../../../hooks/useSelectedCartIds"
import OrderConfirmButton from "../OrderConfirmButton/OrderConfirmButton"

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
    handleSelectCartItem,
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
                isSelected={selectedCartIds.includes(cartItem.id)}
              />
            ))}
          </CartList>
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
