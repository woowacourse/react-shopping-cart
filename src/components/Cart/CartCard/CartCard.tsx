import { CartItem } from "@/type/CartItem";
import ProductQuantityControl from "../CartQuantityControl/CartQuantityControl";
import * as Styled from "./CartCard.style";
import CheckBox from "@/components/common/CheckBox";
import CartCardImage from "@/components/common/CustomImage";
import { useCartDataContext } from "../contexts/CartDataContext";
import { useCartSelectionContext } from "../contexts/CartSelectionContext";

interface CartCardProps {
  cartItem: CartItem;
  isSelected: boolean;
}

function CartCard({ cartItem, isSelected }: CartCardProps) {
  const { handleDeleteCartItem, handleCartItemQuantity, isItemLoading } =
    useCartDataContext();

  const { handleSelectCartItem } = useCartSelectionContext();

  const { product, quantity, id } = cartItem;
  const { name, price, imageUrl } = product;

  const isLoading = isItemLoading(id);

  const handleIncreaseCartItemQuantity = () => {
    handleCartItemQuantity({ id, quantity: quantity + 1 });
  };

  const handleDecreaseCartItemQuantity = () => {
    handleCartItemQuantity({ id, quantity: quantity - 1 });
  };

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
            disabled={isLoading}
            onClick={() => handleDeleteCartItem(id)}
            data-testid={`delete-button-${id}`}
          >
            삭제
          </Styled.DeleteButton>
        </Styled.ButtonWrapper>
        <Styled.Wrapper>
          <CartCardImage imageUrl={imageUrl} alt={name} />
          <Styled.ProductInfo>
            <Styled.ProductName>{name}</Styled.ProductName>
            <Styled.Price>{price.toLocaleString()}원</Styled.Price>
            <ProductQuantityControl
              quantity={quantity}
              handleIncreaseCartItemQuantity={handleIncreaseCartItemQuantity}
              handleDecreaseCartItemQuantity={handleDecreaseCartItemQuantity}
              isQuantityUpdateLoading={isLoading}
            />
          </Styled.ProductInfo>
        </Styled.Wrapper>
      </Styled.Container>
    </li>
  );
}

export default CartCard;
