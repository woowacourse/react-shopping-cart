import { CartItem } from "../../../type/CartItem";
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl";
import * as Styled from "./CartCard.style";

interface CartCardProps {
  cartItem: CartItem;
  handleDeleteCartItem: (productId: string) => void;
  handleCartItemQuantity: (params: { id: string; quantity: string }) => void;
}
function CartCard({
  cartItem,
  handleDeleteCartItem,
  handleCartItemQuantity,
}: CartCardProps) {
  const { product, quantity } = cartItem;
  const { name, price, imageUrl } = product;

  return (
    <li>
      <Styled.Container>
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
            />
          </Styled.ProductInfo>
          <Styled.DeleteButton
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
