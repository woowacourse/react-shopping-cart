import { CartItem } from "../../../type/CartItem";
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl";
import * as Styled from "./CartCard.style";
import unChecked from "/unChecked.svg";
import checked from "/checked.svg";

interface CartCardProps {
  cartItem: CartItem;
  handleDeleteCartItem: (id: string) => void;
  handleCartItemQuantity: (params: { id: string; quantity: string }) => void;
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

  console.log("id", id);
  console.log("isSelected", isSelected);
  return (
    <li>
      <Styled.Container>
        <button onClick={() => handleSelectCartItem(id.toString())}>
          <img src={isSelected ? checked : unChecked} />
        </button>
        <Styled.Image src={imageUrl} alt={name} />
        <Styled.Wrapper>
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <ProductQuantityControl
              quantity={quantity}
              handleIncreaseCartItemQuantity={() =>
                handleCartItemQuantity({
                  id: cartItem.id.toString(),
                  quantity: (quantity + 1).toString(),
                })
              }
              handleDecreaseCartItemQuantity={() =>
                handleCartItemQuantity({
                  id: cartItem.id.toString(),
                  quantity: (quantity - 1).toString(),
                })
              }
              isQuantityUpdateLoading={isQuantityUpdateLoading}
            />
          </Styled.ProductInfo>
          <Styled.DeleteButton
            disabled={isDeleteItemLoading}
            onClick={() => handleDeleteCartItem(product.id.toString())}
          >
            삭제
          </Styled.DeleteButton>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default CartCard;
