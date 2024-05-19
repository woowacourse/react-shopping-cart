import { useSetRecoilState } from "recoil";
import { deleteCartItem, patchCartItemQuantityChange } from "../../api";
import { ACTION_TYPES, CART, ERROR_MESSAGES } from "../../constants";
import { cartItemsState } from "../../recoil/atoms/atoms";
import { CartItem } from "../../types";
import { ActionButton } from "../button/actionButton/ActionButton";
import {
  StyledCartItemCard,
  StyledCartItemCardHeader,
  StyledCartItemCardProductContents,
  StyledProductImg,
  StyledProductInfo,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from "./CartItemCard.styled";
interface CartItemProps extends CartItem {
  selected: boolean;
  onSelect: () => void;
}
export const CartItemCard: React.FC<CartItemProps> = ({
  id,
  product,
  quantity,
  selected,
  onSelect,
}) => {
  const { name, price, imageUrl } = product;
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_CART_ITEM, error);
    }
  };

  const handleItemCountPlus = async (id: number) => {
    try {
      const newQuantity = quantity + CART.QUANTITY_CHANGE_STEP;
      await patchCartItemQuantityChange(id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (error) {
      console.error(ERROR_MESSAGES.PLUS_CART_ITEM, error);
    }
  };

  const handleItemCountMinus = async (id: number) => {
    if (quantity > 1) {
      try {
        const newQuantity = quantity - CART.QUANTITY_CHANGE_STEP;
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
      } catch (error) {
        console.error(ERROR_MESSAGES.MINUS_CART_ITEM, error);
      }
    }
  };

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
        <ActionButton type={ACTION_TYPES.SELECT} clicked={selected} onSelect={onSelect} />
        <ActionButton
          type={ACTION_TYPES.DELETE}
          onDelete={() => handleItemDelete(id)}
          disabled={selected}
        />
      </StyledCartItemCardHeader>
      <StyledCartItemCardProductContents>
        <StyledProductImg src={imageUrl} alt="" />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price.toLocaleString()}원</StyledProductPrice>
          <StyledProductQuantityContainer>
            <ActionButton type={ACTION_TYPES.MINUS} onMinus={() => handleItemCountMinus(id)} />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <ActionButton type={ACTION_TYPES.PLUS} onPlus={() => handleItemCountPlus(id)} />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
