import * as S from "./CartItem.styled";
import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";
import { ResponseCartItem } from "../../types/types";
import useCartItemManager from "../../hooks/useCartItemManager";

interface CartItemProps {
  cart: ResponseCartItem;
  type: "cart" | "check";
}

const CartItem = ({ cart, type }: CartItemProps) => {
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
        {type === "cart" && (
          <S.CartItemHeader>
            <CheckBox
              id={cart.product.id}
              isChecked={isSelected}
              onChange={handleSelect}
              size="small"
            />
            <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
          </S.CartItemHeader>
        )}
        <S.ItemInfo>
          <S.ProductImage src={imageUrl} alt={name} />
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
            {type === "cart" ? (
              <QuantityButton
                quantity={cart.quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ) : (
              <S.ItemQuantity>{cart.quantity}개</S.ItemQuantity>
            )}
          </S.ItemContent>
        </S.ItemInfo>
      </S.ItemContainer>
    </>
  );
};

export default CartItem;
