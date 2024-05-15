import { useSetRecoilState } from "recoil";
import { deleteCartItem } from "../../api";
import { CartItem } from "../../types";
import { ActionButton } from "../button/ActionButton";
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
import { cartItemsState } from "../../recoil/atoms";

interface CartItemProps extends CartItem {
  checked: boolean;
}

export const CartItemCard: React.FC<CartItemProps> = ({
  checked,
  id,
  product,
  quantity,
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

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
        <ActionButton type="select" clicked={checked} />
        <ActionButton type="delete" onDelete={() => handleItemDelete(id)} />
      </StyledCartItemCardHeader>
      <StyledCartItemCardProductContents>
        <StyledProductImg src={imageUrl} alt="" />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price}</StyledProductPrice>
          <StyledProductQuantityContainer>
            <ActionButton type="minus" />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <ActionButton type="plus" />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
