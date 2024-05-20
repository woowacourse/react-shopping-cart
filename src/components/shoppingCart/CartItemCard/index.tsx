import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";

import { cartItemsState } from "../../../stores/cartItems";
import { isCartItemsSelectedState } from "../../../stores/cartItemSelected";

import Button from "../../_common/Button";
import { CheckButton, MinusButton, PlusButton } from "../../button";

import { deleteCartItem, patchCartItemQuantity } from "../../../apis/cart";

import { CartItem } from "../../../types";

import * as S from "./styled";

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: CartItemCardProps) => {
  const { id, product, quantity } = cartItem;

  const [isCartItemsSelected, setIsCartItemsSelected] = useRecoilState(
    isCartItemsSelectedState(id)
  );
  const refresh = useRecoilRefresher_UNSTABLE(cartItemsState);

  const handleDeleteItem = async () => {
    try {
      await deleteCartItem(id);
      refresh();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const handleChangeItemQuantity = async (number: number) => {
    try {
      await patchCartItemQuantity(id, quantity + number);
      refresh();
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <CheckButton
          isChecked={isCartItemsSelected}
          onToggle={() => setIsCartItemsSelected((prev: boolean) => !prev)}
        />
        <Button $theme="white" $size="s" onClick={handleDeleteItem}>
          삭제
        </Button>
      </S.Header>
      <S.Body>
        <S.ItemImg src={product.imageUrl} />
        <S.ItemInfoWrapper>
          <S.ItemInfo>
            <span>{product.name}</span>
            <S.ItemPrice>{product.price.toLocaleString("ko-KR")}</S.ItemPrice>
          </S.ItemInfo>
          <S.ItemQuantity>
            <MinusButton
              quantity={quantity}
              onClick={() => handleChangeItemQuantity(-1)}
            />
            <span>{quantity}</span>
            <PlusButton
              quantity={quantity}
              onClick={() => handleChangeItemQuantity(1)}
            />
          </S.ItemQuantity>
        </S.ItemInfoWrapper>
      </S.Body>
    </S.Container>
  );
};

export default CartItemCard;
