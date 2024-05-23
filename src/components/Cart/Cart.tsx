import { useRecoilState } from "recoil";
import { selectedListState } from "../../recoil/atoms/atoms";
import { deleteCartItem, patchCartItemQuantity } from "../../api/cart";
import type { CartItem } from "../../types/cart";
import { OutlineCheckSvg, FilledCheckSvg } from "../../assets";
import { cartItemsState } from "../../recoil/atoms/atoms";
import {
  Wrapper,
  ItemImg,
  Header,
  Body,
  ItemInfo,
  ItemInfoWrapper,
  ItemQuantity,
} from "./style";
import { SmallText, Button, LargeText } from "../common";

interface CardItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem: { id, product, quantity } }: CardItemProps) => {
  const [selectedList, setSelectedList] = useRecoilState(selectedListState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const handleToggleSelectItem = () => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((selected) => selected !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setCartItems([...cartItems.filter((cartItem) => cartItem.id !== id)]);
      await deleteCartItem(id);
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  const handleChangeItemQuantity = async (number: number) => {
    if (quantity + number < 1) {
      alert("개수는 1보다 작을 수 없습니다");
      return;
    }

    try {
      setCartItems((prev) =>
        prev.map((cartItem) => {
          if (cartItem.id !== id) {
            return cartItem;
          } else {
            return { ...cartItem, quantity: cartItem.quantity + number };
          }
        })
      );
      await patchCartItemQuantity(id, quantity + number);
    } catch (error) {
      setCartItems(cartItems);
      console.error("Failed to remove cart item:", error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Button $borderRadius="8px" onClick={handleToggleSelectItem}>
          {selectedList.includes(id) ? (
            <FilledCheckSvg color="white" />
          ) : (
            <OutlineCheckSvg />
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
            <SmallText>{product.name}</SmallText>
            <LargeText>{product.price.toLocaleString("ko-KR")}</LargeText>
          </ItemInfo>
          <ItemQuantity>
            <Button
              $theme="white"
              $size="xs"
              onClick={() => handleChangeItemQuantity(-1)}
            >
              -
            </Button>
            <span>{quantity}</span>
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
