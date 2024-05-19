import * as S from './styled';
import Checkbox from '../Checkbox/Checkbox';
import Stepper from '../Stepper/Stepper';
import deleteCartItem from '../../api/delete/deleteCartItem';
import changeCartItemQuantity from '../../api/patch/changeCartItemQuantity';
import { CartItem } from '../../types/cartItem';
import { useState } from 'react';

interface ShoppingCartItemProps {
  cartItem: CartItem;
  refetch: () => Promise<void>;
  isSelected: (id: number) => boolean;
  onCheckboxClick: (cartItem: CartItem) => void;
}

const ShoppingCartItem = ({
  cartItem,
  refetch,
  isSelected,
  onCheckboxClick,
}: ShoppingCartItemProps) => {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);

  const onDelete = async () => {
    await deleteCartItem(cartItem.id);
    await refetch();
  };

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
    await refetch();
    setQuantity(newQuantity);
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(quantity - 1, 0);
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
    await refetch();
    setQuantity(newQuantity);
  };

  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox
          id={cartItem.id}
          isChecked={isSelected(cartItem.id)}
          onChange={() => onCheckboxClick(cartItem)}
        />
        <S.DeleteButton type="button" onClick={onDelete}>
          삭제
        </S.DeleteButton>
      </S.Header>
      <S.Contents>
        <S.ProductImage src={cartItem.product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{cartItem.product.name}</S.ProductName>
          <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          <Stepper
            value={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;
