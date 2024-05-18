import { useSetRecoilState } from 'recoil';
import { deleteCartItem, patchCartItemQuantityChange } from '../../api';
import { cartItemsState } from '../../recoil/atoms/atoms';
import { CartItem } from '../../types';
import { Button } from '../../components/common/button/Button';
import CheckedButtonIcon from '../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../assets/UncheckedButtonIcon.png';
import MinusButtonIcon from '../../assets/MinusButtonIcon.png';
import PlusButtonIcon from '../../assets/PlusButtonIcon.png';

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
} from './CartItemCard.styled';
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
      console.error('Failed to delete cart item:', error);
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
      console.error('Failed to increase item quantity:', error);
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
        console.error('Failed to decrease item quantity:', error);
      }
    }
  };

  return (
    <StyledCartItemCard>
      <StyledCartItemCardHeader>
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
      </StyledCartItemCardHeader>
      <StyledCartItemCardProductContents>
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
      </StyledCartItemCardProductContents>
    </StyledCartItemCard>
  );
};
