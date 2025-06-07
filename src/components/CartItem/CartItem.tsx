import * as S from "./CartItem.styled";
import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";
import { ResponseCartItem } from "../../types/types";
import useCartItemManager from "./useCartItemManager";
import { useLocation } from "react-router-dom";

interface CartItemProps {
  cart: ResponseCartItem;
}

const CartItem = ({ cart }: CartItemProps) => {
  //라우터가 /order-complete일때는 수량버튼이 안보이고
  //아닐때는 수량버튼이 보이게 하고 싶음
  const location = useLocation();
  const isOrderComplete = location.pathname === "/order-complete";

  const { price, name, imageUrl } = cart.product;

  const {
    isSelected,
    handleSelect,
    handleIncrease,
    handleDecrease,
    handleDelete,
    orderStatus,
  } = useCartItemManager({ cart });

  return (
    <>
      <S.Line />
      <S.ItemContainer>
        <S.CartItemHeader>
          {orderStatus === "order-complete" ? (
            <></>
          ) : (
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
            {isOrderComplete ? (
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
