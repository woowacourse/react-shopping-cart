import { useSetRecoilState } from "recoil";
import { deleteCartItem, patchCartItemQuantityChange } from "../../api";
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
      console.error("Failed to delete cart item:", error);
    }
  };

  const handleItemCountPlus = async (id: number) => {
    try {
      const newQuantity = quantity + 1;
      await patchCartItemQuantityChange(id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to increase item quantity:", error);
    }
  };

  const handleItemCountMinus = async (id: number) => {
    if (quantity > 1) {
      try {
        const newQuantity = quantity - 1;
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (error) {
        console.error("Failed to decrease item quantity:", error);
      }
    }
  };

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
        <ActionButton type="select" clicked={selected} onSelect={onSelect} />
        <ActionButton
          type="delete"
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
            <ActionButton
              type="minus"
              onMinus={() => handleItemCountMinus(id)}
            />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <ActionButton type="plus" onPlus={() => handleItemCountPlus(id)} />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
