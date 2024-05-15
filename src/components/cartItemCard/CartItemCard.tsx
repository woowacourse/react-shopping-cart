import { useRecoilState, useSetRecoilState } from "recoil";
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
import { cartItemsState, selectedItemsState } from "../../recoil/atoms";

export const CartItemCard: React.FC<CartItem> = ({ id, product, quantity }) => {
  const { name, price, imageUrl } = product;
  const setCartItems = useSetRecoilState(cartItemsState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  const handleItemSelect = () => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // TODO
  // const handleItemCountPlus = () => {
  // };

  // TODO
  // const handleItemCountMinus = () => {
  // };

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
        <ActionButton
          type="select"
          clicked={selectedItems.has(id)}
          onSelect={handleItemSelect}
        />
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
