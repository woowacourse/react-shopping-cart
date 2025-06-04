import * as Styled from "./CartContent.style"
import useShoppingCart from "../../../hooks/useShoppingCart"
import CartList from "../CartList/CartList"
import CartCard from "../CartCard/CartCard"
import checked from "/checked.svg"
import unChecked from "/unChecked.svg"
import { useNavigate } from "react-router"
import { PAGE_URL } from "../../../constants/PageUrl"
import type { OrderConfirmationLocationState } from "../../../type/OrderConfirmation"
import {
  FREE_SHIPPING_OVER,
  SHIPPING_FEE,
} from "../../../constants/priceSetting"
import useSelectedCartIds from "../../../hooks/useSelectedCartIds"

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

  const navigate = useNavigate()
  const handleOrderConfirm = () => {
    const selectedCartItems = cartItemsData.filter((cartItem) =>
      selectedCartIds.includes(cartItem.id)
    )
    const totalPrice = selectedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )

    const shippingFee = totalPrice >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE
    const totalPriceWithShipping = totalPrice + shippingFee

    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength: selectedCartIds.length,
      selectedCartItemsCount: selectedCartItems.reduce(
        (totalCount, item) => totalCount + item.quantity,
        0
      ),
      totalPrice: totalPriceWithShipping,
    }
    navigate(PAGE_URL.ORDER_CONFIRMATION, { state })
  }

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
      <Styled.OrderConfirmButton
        disabled={selectedCartIds.length === 0}
        onClick={handleOrderConfirm}
      >
        주문 확인
      </Styled.OrderConfirmButton>
    </Styled.CartContentContainer>
  )
}

export default CartContent
