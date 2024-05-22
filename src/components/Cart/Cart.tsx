import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";
import {
  selectedListState,
  cartItemQuantityState,
} from "../../recoil/atoms/atoms";
import Button from "../common/Button/Button";
import { deleteCartItem, patchCartItemQuantity } from "../../api/cart";
import type { CartItem } from "../../types/cart";
import OutlineCheck from "../../assets/icon/OutlineCheck";
import FilledCheck from "../../assets/icon/FilledCheck";
import { useEffect } from "react";
import { cartItemsAtom } from "../../recoil/atoms/atoms";

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

interface CardItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem: { id, product, quantity } }: CardItemProps) => {
  const [selectedList, setSelectedList] = useRecoilState(selectedListState);
  const [cartItemQuantity, setCartItemQuantity] = useRecoilState(
    cartItemQuantityState(id)
  );
  const refresh = useRecoilRefresher_UNSTABLE(cartItemsAtom);

  const handleToggleSelectItem = () => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((selected) => selected !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await deleteCartItem(id);
      refresh();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const handleChangeItemQuantity = async (number: number) => {
    if (cartItemQuantity + number < 1) {
      alert("개수는 1보다 작을 수 없습니다");
      return;
    }

    try {
      setCartItemQuantity(() => cartItemQuantity + number);
      await patchCartItemQuantity(id, cartItemQuantity + number);
    } catch (error) {
      setCartItemQuantity(cartItemQuantity);
      console.error("Failed to remove cart item:", error);
    }
  };

  useEffect(() => {
    setCartItemQuantity(quantity);
  }, [quantity, setCartItemQuantity]);

  return (
    <Wrapper>
      <Header>
        <Button $borderRadius="8px" onClick={handleToggleSelectItem}>
          {selectedList.includes(id) ? (
            <FilledCheck color="white" />
          ) : (
            <OutlineCheck />
          )}
        </Button>
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
            <Button
              $theme="white"
              $size="xs"
              onClick={() => handleChangeItemQuantity(-1)}
            >
              -
            </Button>
            <span>{cartItemQuantity}</span>
            <Button
              $theme="white"
              $size="xs"
              onClick={() => handleChangeItemQuantity(1)}
            >
              +
            </Button>
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CartItem;
