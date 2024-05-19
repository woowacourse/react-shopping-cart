import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";

import { cartItemsState } from "../../stores/cartItems";
import { isCartItemsSelectedState } from "../../stores/cartItemSelected";

import Button from "../_common/Button";
import { MinusButton, PlusButton } from "../button/QuantityButton";

import { deleteCartItem, patchCartItemQuantity } from "../../apis";

import { CartItemType } from "../../types";

import {
  Wrapper,
  ItemImg,
  Header,
  Body,
  ItemPrice,
  ItemInfo,
  ItemInfoWrapper,
  ItemQuantity,
} from "./style";
import CheckButton from "../button/CheckButton";

interface CardItemProps {
  cartItem: CartItemType;
}

const CartItem = ({ cartItem }: CardItemProps) => {
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
    <Wrapper>
      <Header>
        <CheckButton
          isChecked={isCartItemsSelected}
          onToggle={() => setIsCartItemsSelected((prev: boolean) => !prev)}
        />
        <Button $theme="white" $size="s" onClick={handleDeleteItem}>
          삭제
        </Button>
      </Header>
      <Body>
        <ItemImg src={product.imageUrl} />
        <ItemInfoWrapper>
          <ItemInfo>
            <span>{product.name}</span>
            <ItemPrice>{product.price.toLocaleString("ko-KR")}</ItemPrice>
          </ItemInfo>
          <ItemQuantity>
            <MinusButton
              quantity={quantity}
              onClick={() => handleChangeItemQuantity(-1)}
            />
            <span>{quantity}</span>
            <PlusButton
              quantity={quantity}
              onClick={() => handleChangeItemQuantity(1)}
            />
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CartItem;
