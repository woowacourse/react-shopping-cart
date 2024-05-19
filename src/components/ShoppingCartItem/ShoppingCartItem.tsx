import { ORDER } from '../../constants/constants';

import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import SetQuantity from '../SetQuantity/SetQuantity';

import { CartItem } from '../../api/get/getItems';
import deleteItem from '../../api/delete/deleteItem';
import changeQuantity from '../../api/patch/changeQuantity';
import * as S from './styled';

interface ShoppingCartItemProps {
  cartItem: CartItem;
  refetch: () => Promise<void>;
  isSelected: (id: number) => boolean;
  toggleItemSelection: (cartItem: CartItem) => void;
  updateSelectedItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
  getOneItemQuantity: (id: number) => number | undefined;
  setOneItemQuantity: (id: number, newQuantity: number) => void;
}

const ShoppingCartItem = ({
  cartItem,
  refetch,
  isSelected,
  toggleItemSelection,
  updateSelectedItemQuantity,
  getOneItemQuantity,
  setOneItemQuantity,
}: ShoppingCartItemProps) => {
  const onDelete = async () => {
    await deleteItem(cartItem.id);
    await refetch();
  };

  const quantity = getOneItemQuantity(cartItem.id) ?? ORDER.MINIMUM_QUANTITY;

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    await changeQuantity({ id: cartItem.id, quantity: newQuantity });

    setOneItemQuantity(cartItem.id, newQuantity);
    updateSelectedItemQuantity(cartItem, newQuantity);
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(quantity - 1, ORDER.MINIMUM_QUANTITY);
    await changeQuantity({ id: cartItem.id, quantity: newQuantity });

    setOneItemQuantity(cartItem.id, newQuantity);
    updateSelectedItemQuantity(cartItem, newQuantity);
  };

  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox
          id={cartItem.id.toString()}
          isChecked={isSelected(cartItem.id)}
          onClick={() => toggleItemSelection(cartItem)}
        />
        <DeleteButton onClick={onDelete} />
      </S.Header>
      <S.Contents>
        <S.ProductImage src={cartItem.product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{cartItem.product.name}</S.ProductName>
          <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          <SetQuantity
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;
