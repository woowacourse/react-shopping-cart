import useCart from "../../hooks/useCart";
import { CartItemContent } from "../../types/response";
import Checkbox from "../Checkbox/Checkbox";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

interface Props {
  cartItem: CartItemContent;
}

const MIN_QUANTITY = 1;

const CartItem = ({ cartItem }: Props) => {
  const {
    id: cartId,
    quantity: currentQuantity,
    product: { name, price, imageUrl, stock: maxQuantity },
  } = cartItem;

  const { deleteItem, increaseItemQuantity, decreaseItemQuantity } = useCart();

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox checked={false} />
        <S.DeleteButton onClick={() => deleteItem(cartId)}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImage $url={imageUrl} />
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
