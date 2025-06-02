import useCart from "../../hooks/useCart";
import { CartItemContent } from "../../types/response";
import Checkbox from "../@common/Checkbox/Checkbox";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

interface Props {
  cartItem: CartItemContent;
}

const MIN_QUANTITY = 1;
const IMG_BASE_URL = "/react-shopping-cart";
const DEFAULT_IMAGE_URL = "/planet-default-image.svg";

const CartItem = ({ cartItem }: Props) => {
  const {
    id: cartId,
    quantity: currentQuantity,
    product: { name, price, imageUrl, stock: maxQuantity },
  } = cartItem;

  const {
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemChecked,
    toggleItemChecked,
  } = useCart();

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox
          checked={getItemChecked(cartId)}
          onClick={() => toggleItemChecked(cartId)}
        />
        <S.DeleteButton onClick={() => deleteItem(cartId)}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImageWrapper>
          <S.CartItemImage
            src={imageUrl ? imageUrl : IMG_BASE_URL + DEFAULT_IMAGE_URL}
            alt={name}
          />
        </S.CartItemImageWrapper>
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantityCounter
            quantity={currentQuantity}
            onIncrease={() => increaseItemQuantity(cartId, currentQuantity)}
            onDecrease={() => decreaseItemQuantity(cartId, currentQuantity)}
            increaseDisabled={currentQuantity >= maxQuantity}
            decreaseDisabled={currentQuantity <= MIN_QUANTITY}
          />
        </S.CartItemInfo>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
