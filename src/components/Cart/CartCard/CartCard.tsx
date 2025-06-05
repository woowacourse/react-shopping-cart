import { CartItem } from "../../../type/CartItem"
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl"
import * as Styled from "./CartCard.style"
import unChecked from "/unChecked.svg"
import checked from "/checked.svg"

interface CartCardProps {
  cartItem: CartItem
  handleDeleteCartItem: (id: number) => Promise<void>
  handleCartItemQuantity: (params: {
    id: number
    quantity: number
  }) => Promise<void>
  handleRemoveSelectCartItem: (id: number) => void
  handleAddSelectCartItem: (id: number) => void
  isDeleteItemLoading: boolean
  isQuantityUpdateLoading: boolean
  isSelected: boolean
}

function CartCard({
  cartItem,
  handleDeleteCartItem,
  handleCartItemQuantity,
  handleRemoveSelectCartItem,
  handleAddSelectCartItem,
  isDeleteItemLoading,
  isQuantityUpdateLoading,
  isSelected,
}: CartCardProps) {
  const { product, quantity, id } = cartItem
  const { name, price, imageUrl } = product

  return (
    <li>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <Styled.SelectButton
            onClick={() =>
              isSelected
                ? handleRemoveSelectCartItem(id)
                : handleAddSelectCartItem(id)
            }
            type="button"
            aria-label={isSelected ? "상품 선택 해제" : "상품 선택"}
          >
            <Styled.SelectIcon
              src={isSelected ? checked : unChecked}
              alt={isSelected ? "선택됨" : "선택 안 됨"}
            />
          </Styled.SelectButton>
          <Styled.DeleteButton
            disabled={isDeleteItemLoading}
            onClick={async () => {
              handleRemoveSelectCartItem(id)
              await handleDeleteCartItem(id)
            }}
            aria-label={`${name} 상품 삭제`}
          >
            삭제
          </Styled.DeleteButton>
        </Styled.ButtonWrapper>
        <Styled.Wrapper>
          <Styled.Image
            src={imageUrl}
            alt={`${name} 상품 이미지`}
          />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <ProductQuantityControl
              quantity={quantity}
              handleIncreaseCartItemQuantity={async () =>
                await handleCartItemQuantity({
                  id: cartItem.id,
                  quantity: quantity + 1,
                })
              }
              handleDecreaseCartItemQuantity={async () =>
                await handleCartItemQuantity({
                  id: cartItem.id,
                  quantity: quantity - 1,
                })
              }
              isQuantityUpdateLoading={isQuantityUpdateLoading}
            />
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  )
}

export default CartCard
