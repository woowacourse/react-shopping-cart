import { COUNTER_BUTTON_TYPES } from "../../constants";
import { useDecreaseCartItemQuantity } from "../../hooks/useDecreaseCartItemQuantity";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem";
import { useIncreaseCartItemQuantity } from "../../hooks/useIncreaseCartItemQuantity";
import { CartItem } from "../../types";
import { CheckboxButton, CounterButton, DeleteButton } from "../button";
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

  const handleItemDelete = useDeleteCartItem();
  const handleItemCountPlus = useIncreaseCartItemQuantity();
  const handleItemCountMinus = useDecreaseCartItemQuantity();

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
              onClick={() => handleItemCountMinus({ id, quantity })}
            />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <CounterButton
              type={COUNTER_BUTTON_TYPES.INCREMENT}
              onClick={() => handleItemCountPlus({ id, quantity })}
            />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
