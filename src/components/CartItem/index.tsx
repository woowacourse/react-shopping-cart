import { CartItemResponse } from "../../types/ShoppingCart";
import styled from "styled-components";
import ItemCounter from "../ItemCounter/index";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemQuantityStates } from "../../recoil/atoms";
import BasicButton from "../Button/BasicButton/index";
import CheckboxButton from "../Button/CheckboxButton/index";
import { checkCartItemSelector } from "../../recoil/selectors";
import { uncheckCartItemSelector } from "../../recoil/selectors";
import { checkedCartItemsState } from "../../recoil/atoms";
import { deleteCartItem, patchCartItemQuantity } from "../../api/cartItem";

interface CartItemProps extends Omit<CartItemResponse, "quantity"> {
  removeCartItem: (itemId: number) => void;
}

const CartItem = ({ id, product, removeCartItem }: CartItemProps) => {
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityStates(id));

  const checkItems = useRecoilValue(checkedCartItemsState);
  const checkCartItem = useSetRecoilState(checkCartItemSelector);
  const uncheckCartItem = useSetRecoilState(uncheckCartItemSelector);

  const isCheckedItem = checkItems.includes(id) ? true : false;

  const handleRemoveItem = () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    removeCartItem(id);
    uncheckCartItem(id);
    deleteCartItem(id);
  };

  const handleIncrease = () => {
    patchCartItemQuantity(id, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      patchCartItemQuantity(id, quantity - 1);
      setQuantity(quantity - 1);
      return;
    }

    handleRemoveItem();
  };

  return (
    <CartItemContainer>
      <TopContainer>
        <CheckboxButton
          onClick={() => (isCheckedItem ? uncheckCartItem(id) : checkCartItem(id))}
          isChecked={isCheckedItem}
        />
        <BasicButton label="삭제" onClick={handleRemoveItem} />
      </TopContainer>
      <CartItemWrapper>
        <Thumbnail src={product.imageUrl} />
        <CartItemContents>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
          <ItemCounter value={quantity} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
        </CartItemContents>
      </CartItemWrapper>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: black;
  border-top: 1px solid #0000001a;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`;

const Thumbnail = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

const Name = styled.p`
  width: 100%;
  height: 15px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;

const Price = styled.p`
  width: 100%;
  height: 26px;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  margin-bottom: 19px;
`;

const CartItemWrapper = styled.div`
  display: flex;
`;

const CartItemContents = styled.div`
  margin: 9.5px 0 9.5px 24px;
`;
