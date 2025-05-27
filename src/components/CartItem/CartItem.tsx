import { CartItemContent } from "../../types/response";
import Checkbox from "../Checkbox/Checkbox";
import QuantityCounter from "../QuantityCounter/QuantityCounter";
import * as S from "./CartItem.styles";

const CartItem = ({ cartItem }: { cartItem: CartItemContent }) => {
  const {
    // id: cartId,
    quantity: currentQuantity,
    product: {
      // id: productId,
      name,
      price,
      imageUrl,
      stock: maxQuantity,
    },
  } = cartItem;

  return (
    <S.CartItem>
      <S.CartItemHeader>
        <Checkbox checked={true} />
        <S.DeleteButton onClick={() => {}}>삭제</S.DeleteButton>
      </S.CartItemHeader>
      <S.CartItemWrapper>
        <S.CartItemImage $url={imageUrl} />
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price.toLocaleString()}원</S.CartItemPrice>
          <QuantityCounter
            quantity={currentQuantity}
            onIncrease={() => {}}
            onDecrease={() => {}}
            increaseDisabled={currentQuantity >= maxQuantity}
          />
        </S.CartItemInfo>
      </S.CartItemWrapper>
    </S.CartItem>
  );
};

export default CartItem;
