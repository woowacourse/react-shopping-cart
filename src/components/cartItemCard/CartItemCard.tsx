import { COUNTER_BUTTON_TYPES } from "../../constants";
<<<<<<< HEAD
import { useChangeCartItemQquntity } from "../../hooks/useChangeCartItemQuantity";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem";
=======
import { useDecreaseCartItemQuantity } from "../../hooks/useDecreaseCartItemQuantity";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem";
import { useIncreaseCartItemQuantity } from "../../hooks/useIncreaseCartItemQuantity";
>>>>>>> 00kang
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
<<<<<<< HEAD
  const handleItemCountChange = useChangeCartItemQquntity();
=======
  const handleItemCountPlus = useIncreaseCartItemQuantity();
  const handleItemCountMinus = useDecreaseCartItemQuantity();
>>>>>>> 00kang

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
<<<<<<< HEAD
              onClick={() =>
                handleItemCountChange({ id, quantity }, COUNTER_BUTTON_TYPES.DECREMENT)
              }
=======
              onClick={() => handleItemCountMinus({ id, quantity })}
>>>>>>> 00kang
            />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <CounterButton
              type={COUNTER_BUTTON_TYPES.INCREMENT}
<<<<<<< HEAD
              onClick={() =>
                handleItemCountChange({ id, quantity }, COUNTER_BUTTON_TYPES.INCREMENT)
              }
=======
              onClick={() => handleItemCountPlus({ id, quantity })}
>>>>>>> 00kang
            />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
