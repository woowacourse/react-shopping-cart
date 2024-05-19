import { useSetRecoilState } from "recoil";
import { deleteCartItem, patchCartItemQuantityChange } from "../../api";
import { CART, COUNTER_BUTTON_TYPES, ERROR_MESSAGES } from "../../constants";
import { cartItemsState } from "../../recoil/atoms/atoms";
import { CartItem } from "../../types";
import { CheckboxButton } from "../button/checkboxButton/CheckboxButton";
import { CounterButton } from "../button/counterButton/CounterButton";
import { DeleteButton } from "../button/deleteButton/DeleteButton";
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
  isChecked: boolean;
  onCheck: () => void;
}
export const CartItemCard: React.FC<CartItemProps> = ({
  id,
  product,
  quantity,
  isChecked,
  onCheck,
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
        <CheckboxButton isChecked={isChecked} onCheck={onCheck} />
        <DeleteButton onDelete={() => handleItemDelete(id)} disabled={isChecked} />
      </StyledCartItemCardHeader>
      <StyledCartItemCardProductContents>
        <StyledProductImg src={imageUrl} alt="" />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price.toLocaleString()}원</StyledProductPrice>
          <StyledProductQuantityContainer>
            <CounterButton
              type={COUNTER_BUTTON_TYPES.DECREMENT}
              onClick={() => handleItemCountMinus(id)}
            />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <CounterButton
              type={COUNTER_BUTTON_TYPES.INCREMENT}
              onClick={() => handleItemCountPlus(id)}
            />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
