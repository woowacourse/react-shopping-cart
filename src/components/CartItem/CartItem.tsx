import * as S from "./CartItem.styled";
import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";
import { ResponseCartItem } from "../../types/types";
import useCartItemManager from "../../hooks/useCartItemManager";

interface CartItemProps {
  cart: ResponseCartItem;
}

const CartItem = ({ cart }: CartItemProps) => {
  const { price, name, imageUrl } = cart.product;

  const {
    isSelected,
    handleSelect,
    handleIncrease,
    handleDecrease,
    handleDelete,
  } = useCartItemManager({ cart });

  return (
    <>
      <S.Line />
      <S.ItemContainer>
        <S.CartItemHeader>
          <CheckBox isChecked={isSelected} onChange={handleSelect} />
          <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
        </S.CartItemHeader>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl} alt={name} />
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
            <QuantityButton
              quantity={cart.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </S.ItemContent>
        </S.ItemInfo>
      </S.ItemContainer>
    </>
  );
};

export default CartItem;
