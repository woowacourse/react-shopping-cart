import { useSetRecoilState } from 'recoil';
import { deleteCartItem, patchCartItemQuantityChange } from '../../../api';
import {
  cartErrorMessageState,
  cartItemsState,
} from '../../../recoil/atoms/atoms';
import { CartItemProps } from '../../../types';
import { Button } from '../../common/button/Button';
import CheckedButtonIcon from '../../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../../assets/UncheckedButtonIcon.png';
import MinusButtonIcon from '../../../assets/MinusButtonIcon.png';
import PlusButtonIcon from '../../../assets/PlusButtonIcon.png';
import { CART_MESSAGES } from '../../../constants/cart';
import {
  StyledItemCard,
  StyledItemCardHeader,
  StyledItemCardProductContents,
  StyledProductImg,
  StyledProductInfo,
  StyledProductName,
  StyledProductPrice,
  StyledProductQuantityContainer,
  StyledProductQuantityText,
} from '../ItemCard.styled';

interface CartItemCardProps extends CartItemProps {
  selected: boolean;
  onSelect: () => void;
}
export const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  product,
  quantity,
  selected,
  onSelect,
}) => {
  const { name, price, imageUrl } = product;
  const setCartItems = useSetRecoilState(cartItemsState);
  const setCartErrorMessage = useSetRecoilState(cartErrorMessageState);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setCartErrorMessage(CART_MESSAGES.DELETE_ITEM_FAIL);
        console.error('Failed to delete cart item:', error.message);
      }
    }
  };

  const handleItemCountPlus = async (id: number) => {
    try {
      const newQuantity = quantity + 1;
      await patchCartItemQuantityChange(id, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        setCartErrorMessage(CART_MESSAGES.INCREASE_QUANTITY_FAIL);
        console.error('Failed to increase item quantity:', error);
      }
    }
  };

  const handleItemCountMinus = async (id: number) => {
    if (quantity > 1) {
      try {
        const newQuantity = quantity - 1;
        await patchCartItemQuantityChange(id, newQuantity);
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          ),
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to decrease item quantity', error.message);
          setCartErrorMessage(CART_MESSAGES.DECREASE_QUANTITY_FAIL);
        }
      }
    }
  };

  return (
    <StyledItemCard>
      <StyledItemCardHeader>
        <Button
          onClick={onSelect}
          clicked={selected}
          iconSrc={selected ? CheckedButtonIcon : UnCheckedButtonIcon}
        />
        <Button
          onClick={() => handleItemDelete(id)}
          disabled={selected}
          text='삭제'
        />
      </StyledItemCardHeader>
      <StyledItemCardProductContents>
        <StyledProductImg src={imageUrl} alt='' />
        <StyledProductInfo>
          <StyledProductName>{name}</StyledProductName>
          <StyledProductPrice>{price.toLocaleString()}원</StyledProductPrice>
          <StyledProductQuantityContainer>
            <Button
              onClick={() => handleItemCountMinus(id)}
              iconSrc={MinusButtonIcon}
            />
            <StyledProductQuantityText>{quantity}</StyledProductQuantityText>
            <Button
              onClick={() => handleItemCountPlus(id)}
              iconSrc={PlusButtonIcon}
            />
          </StyledProductQuantityContainer>
        </StyledProductInfo>
      </StyledItemCardProductContents>
    </StyledItemCard>
  );
};
