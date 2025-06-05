import useOrderConfirm from "../../../hooks/useOrderConfirm"
import { CartItem } from "../../../type/CartItem"

import * as Styled from "./OrderConfirmButton.style"

interface OrderConfirmButtonProps {
  selectedCartIds: number[]
  cartItemsData: CartItem[]
}

function OrderConfirmButton({
  selectedCartIds,
  cartItemsData,
}: OrderConfirmButtonProps) {
  const { handleOrderConfirm } = useOrderConfirm({
    cartItemsData,
    selectedCartIds,
  })

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartIds.length === 0}
      onClick={handleOrderConfirm}
      type="button"
      aria-label="주문 확인"
    >
      주문 확인
    </Styled.OrderConfirmButton>
  )
}

export default OrderConfirmButton
