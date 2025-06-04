import { CartItem } from "../../../type/CartItem";
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl";
import * as Styled from "./CartCard.style";
import unChecked from "/unChecked.svg";
import checked from "/checked.svg";

interface CartCardProps {
  cartItem: CartItem;
  handleDeleteCartItem: (id: number) => void;
  handleCartItemQuantity: (params: { id: number; quantity: number }) => void;
  handleSelectCartItem: (id: number) => void;
  isDeleteItemLoading: boolean;
  isQuantityUpdateLoading: boolean;
  isSelected: boolean;
}

function CartCard({
  cartItem,
  handleDeleteCartItem,
  handleCartItemQuantity,
  handleSelectCartItem,
  isDeleteItemLoading,
  isQuantityUpdateLoading,
  isSelected,
}: CartCardProps) {
  const { product, quantity, id } = cartItem;
  const { name, price, imageUrl } = product;
  return (
    <li>
      <Styled.Container>
        <Styled.ButtonWrapper>
          <Styled.SelectButton onClick={() => handleSelectCartItem(id)}>
            <Styled.SelectIcon src={isSelected ? checked : unChecked} />
          </Styled.SelectButton>
          <Styled.DeleteButton
            disabled={isDeleteItemLoading}
            onClick={() => handleDeleteCartItem(id)}
          >
            삭제
          </Styled.DeleteButton>
        </Styled.ButtonWrapper>
        <Styled.Wrapper>
          <Styled.Image src={imageUrl} alt={name} />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <ProductQuantityControl
              quantity={quantity}
              handleIncreaseCartItemQuantity={() =>
                handleCartItemQuantity({
                  id: cartItem.id,
                  quantity: quantity + 1,
                })
              }
              handleDecreaseCartItemQuantity={() =>
                handleCartItemQuantity({
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
  );
}

export default CartCard;
