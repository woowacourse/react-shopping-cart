import { CartItemResponse } from "../../../types/ShoppingCart";
import styled from "styled-components";
import ItemCounter from "../../common/ItemCounter";
import BasicButton from "../../common/Button/BasicButton";
import CheckboxButton from "../../common/Button/CheckboxButton";
import { deleteCartItem } from "../../../api/cartItem";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";
import { SHOPPING_MESSAGE } from "../../../constants/messages";
import useCartItemQuantity from "../../../hooks/useCartItemQuantity";
import useCheckCartItem from "../../../hooks/useCheckCartItem";

type CartItemType = "edit" | "readonly";

interface CartItemProps extends Omit<CartItemResponse, "quantity"> {
  cartItemType: CartItemType;
  removeCartItem?: (itemId: number) => void;
}

const CartItem = ({ id, product, cartItemType, removeCartItem }: CartItemProps) => {
  const { quantity, handleIncrease, handleDecrease } = useCartItemQuantity(id);
  const { checkedCartItems, checkCartItem, uncheckCartItem } = useCheckCartItem();

  const isCheckedItem = checkedCartItems.includes(id);
  const isEditable = cartItemType === "edit";

  const handleRemoveItem = () => {
    if (!confirm(SHOPPING_MESSAGE.confirmDelete)) return;
    removeCartItem && removeCartItem(id);
    uncheckCartItem(id);
    deleteCartItem(id);
  };

  return (
    <CartItemContainer isReadonly={!isEditable}>
      {isEditable && (
        <TopContainer>
          <CheckboxButton
            onClick={() => (isCheckedItem ? uncheckCartItem(id) : checkCartItem(id))}
            isChecked={isCheckedItem}
          />
          <BasicButton label="삭제" onClick={handleRemoveItem} />
        </TopContainer>
      )}
      <CartItemWrapper>
        <Thumbnail src={product.imageUrl} />
        <CartItemContents>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
          {isEditable ? (
            <ItemCounter
              value={quantity}
              handleIncrease={handleIncrease}
              handleDecrease={() => (quantity > 1 ? handleDecrease() : handleRemoveItem())}
            />
          ) : (
            <CartItemCount>{quantity}개</CartItemCount>
          )}
        </CartItemContents>
      </CartItemWrapper>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div<{ isReadonly: boolean }>`
  ${({ isReadonly }) => isReadonly && "padding-top: 12px"};
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${COLOR.black};
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
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 15px;
  text-align: left;
`;

const Price = styled.p`
  width: 100%;
  height: 26px;
  font-size: ${FONT_SIZE.extraLarge};
  font-weight: ${FONT_WEIGHT.bold};
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

const CartItemCount = styled.p`
  font-size: 12px;
  height: 24px;
`;
