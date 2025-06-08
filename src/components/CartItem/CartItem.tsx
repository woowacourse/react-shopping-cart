import * as S from "./CartItem.styled";
import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";
import { ResponseCartItem } from "../../types/types";
import useCartItemManager from "./useCartItemManager";

interface CartItemProps {
  cart: ResponseCartItem;
  isReadOnly?: boolean;
}

const CartItem = ({ cart, isReadOnly = false }: CartItemProps) => {
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
          {!isReadOnly && (
            <>
              <CheckBox isChecked={isSelected} onClick={handleSelect} />
              <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
            </>
          )}
        </S.CartItemHeader>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl} alt={name} />
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price.toLocaleString("ko-KR")}원</S.ItemPrice>
            {isReadOnly ? (
              <S.ItemTitle>{cart.quantity}개</S.ItemTitle>
            ) : (
              <QuantityButton
                quantity={cart.quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            )}
          </S.ItemContent>
        </S.ItemInfo>
      </S.ItemContainer>
    </>
  );
};

export default CartItem;
