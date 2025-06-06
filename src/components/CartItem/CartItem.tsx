import useCart from "../../hooks/contexts/useCart";
import { CartItemWithCheck } from "../../types/response";
import Checkbox from "../@common/Checkbox/Checkbox";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

interface Props {
  item: CartItemWithCheck;
}

const MIN_QUANTITY = 1;

const CartItem = ({ item: { id, quantity, product, checked } }: Props) => {
  const { deleteItem, updateItemQuantity, toggleItemChecked } = useCart();

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox checked={checked} onClick={() => toggleItemChecked(id)} />
        <S.DeleteButton onClick={() => deleteItem(id)}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImage $url={product.imageUrl} />
        <S.CartItemInfo>
          <S.CartItemName>{product.name}</S.CartItemName>
          <S.CartItemPrice>{product.price.toLocaleString()}원</S.CartItemPrice>
          <QuantityCounter
            quantity={quantity}
            onIncrease={() => updateItemQuantity(id, quantity + 1)}
            onDecrease={() => updateItemQuantity(id, quantity - 1)}
            increaseDisabled={quantity >= product.stock}
            decreaseDisabled={quantity <= MIN_QUANTITY}
          />
        </S.CartItemInfo>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
