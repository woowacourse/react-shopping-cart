import { deleteCartItem } from "../../apis/cartItems/deleteCartItems";
import { patchCartItems } from "../../apis/cartItems/patchCartItems";
import { CartItemContent } from "../../types/response";
import Checkbox from "../Checkbox/Checkbox";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

interface Props {
  cartItem: CartItemContent;
  fetchData: () => void;
}

const MIN_QUANTITY = 1;

const CartItem = ({ cartItem, fetchData }: Props) => {
  const {
    id: cartId,
    quantity: currentQuantity,
    product: { name, price, imageUrl, stock: maxQuantity },
  } = cartItem;

  const deleteCartItemByCartId = async () => {
    await deleteCartItem(cartId);
    fetchData();
  };

  const increaseCartItemQuantity = async () => {
    await patchCartItems({
      cartId,
      quantity: currentQuantity + 1,
    });
    fetchData();
  };

  const decreaseCartItemQuantity = async () => {
    await patchCartItems({
      cartId,
      quantity: currentQuantity - 1,
    });
    fetchData();
  };

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox checked={true} />
        <S.DeleteButton onClick={deleteCartItemByCartId}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImage $url={imageUrl} />
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantityCounter
            quantity={currentQuantity}
            onIncrease={increaseCartItemQuantity}
            onDecrease={decreaseCartItemQuantity}
            increaseDisabled={currentQuantity >= maxQuantity}
            decreaseDisabled={currentQuantity <= MIN_QUANTITY}
          />
        </S.CartItemInfo>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
