import { CartItem } from "../../../type/CartItem";
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl";
import * as Styled from "./CartCard.style";
import CheckBox from "../../common/CheckBox";

interface CartCardProps {
  cartItem: CartItem;
  handleDeleteCartItem: (id: string) => void;
  handleCartItemQuantity: (params: { id: string; quantity: number }) => void;
  handleSelectCartItem: (id: string) => void;
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
          <CheckBox
            id={`select-checkbox-${name}-${id}`}
            checked={isSelected}
            onChange={() => handleSelectCartItem(id)}
            label={name}
            boxSize="small"
            hidden={true}
          />
          <Styled.DeleteButton
            disabled={isDeleteItemLoading || isQuantityUpdateLoading}
            onClick={() => handleDeleteCartItem(id)}
            data-testid={`delete-button-${id}`}
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
