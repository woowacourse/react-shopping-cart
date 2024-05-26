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
  CountButton,
  DeleteButton,
} from "./style";
import { Text } from "../common";
import { useLocation } from "react-router-dom";
import { MAIN_PAGE_PATH, ORDER_PAGE_PATH } from "../../constants/path";

interface CardItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem: { id, product, quantity } }: CardItemProps) => {
  const location = useLocation();
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
      {location.pathname === MAIN_PAGE_PATH && (
        <Header>
          {selectedList.includes(id) ? (
            <FilledCheckSvg onClick={handleToggleSelectItem} />
          ) : (
            <OutlineCheckSvg onClick={handleToggleSelectItem} />
          )}
          <DeleteButton onClick={handleDeleteItem}>
            <Text size="small">삭제</Text>
          </DeleteButton>
        </Header>
      )}

      <Body>
        <ItemImg src={product.imageUrl} />
        <ItemInfoWrapper>
          <ItemInfo>
            <Text size="small">{product.name}</Text>
            <Text size="large">{product.price.toLocaleString("ko-KR")}</Text>
          </ItemInfo>
          <ItemQuantity>
            {location.pathname === MAIN_PAGE_PATH && (
              <>
                <CountButton onClick={() => handleChangeItemQuantity(-1)}>-</CountButton>
                <Text size="small">{quantity}</Text>
                <CountButton onClick={() => handleChangeItemQuantity(1)}>+</CountButton>
              </>
            )}
            {location.pathname === ORDER_PAGE_PATH && <Text size="small">{quantity}개</Text>}
          </ItemQuantity>
        </ItemInfoWrapper>
      </Body>
    </Wrapper>
  );
};

export default CartItem;
