import * as S from "./CartItem.styled";

import QuantityButton from "../QuantityButton/QuantityButton";
import CheckBox from "../CheckBox/CheckBox";
import updateCartItemApi from "../../api/updateCartItemApi";
import { ResponseCartItem } from "../../types/types";
import { useCartDispatch } from "../../stores/CartContext";
import {
  useSelectContext,
  useSelectDispatch,
} from "../../stores/SelectContext";

function CartItem({ cart }: { cart: ResponseCartItem }) {
  const { price, name, imageUrl } = cart.product;
  const dispatch = useCartDispatch();
  const selectState = useSelectContext();
  const selectDispatch = useSelectDispatch();

  const handleSelect = (id: number) => {
    const isSelected = selectState.find((item) => item.id === id)?.selected;

    if (isSelected) {
      selectDispatch({
        type: "REMOVE_SELECT",
        payload: { id },
      });
    } else {
      selectDispatch({
        type: "ADD_SELECT",
        payload: { id },
      });
    }

  };

  const handleIncrease = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    try {
      await updateCartItemApi(id, quantity + 1);
      dispatch({
        type: "ADD_ITEM_QUANTITY",
        payload: { id, quantity: quantity + 1 },
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDecrease = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    try {
      await updateCartItemApi(id, quantity - 1);
      dispatch({
        type: "SUB_ITEM_QUANTITY",
        payload: { id, quantity: quantity - 1 },
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await updateCartItemApi(cart.id, 0);
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: cart.id },
      });

      selectDispatch({
        type: "REMOVE_SELECT",
        payload: { id: cart.id },
      });
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  return (
    <>
      <S.Line />
      <S.ItemContainer>
        <S.CartItemHeader>
          <CheckBox
            isChecked={
              selectState.find((item) => item.id === cart.id)?.selected || false
            }
            onClick={() => handleSelect(cart.id)}
          />
          <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
        </S.CartItemHeader>
        <S.ItemInfo>
          <S.ProductImage src={imageUrl}></S.ProductImage>
          <S.ItemContent>
            <S.ItemTitle>{name}</S.ItemTitle>
            <S.ItemPrice>{price}원</S.ItemPrice>
            <QuantityButton
              quantity={cart.quantity}
              onIncrease={() =>
                handleIncrease({ id: cart.id, quantity: cart.quantity })
              }
              onDecrease={() =>
                handleDecrease({ id: cart.id, quantity: cart.quantity })
              }
            />
          </S.ItemContent>
        </S.ItemInfo>
      </S.ItemContainer>
    </>
  );
}
export default CartItem;
