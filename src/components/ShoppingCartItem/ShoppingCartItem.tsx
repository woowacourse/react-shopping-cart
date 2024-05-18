import * as S from './styled';
import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import SetQuantity from '../SetQuantity/SetQuantity';
import deleteCartItem from '../../api/delete/deleteCartItem';
import changeCartItemQuantity from '../../api/patch/changeCartItemQuantity';
import { CartItem } from '../../types/cartItem';

interface ShoppingCartItemProps {
  cartItem: CartItem;
  refetch: () => Promise<void>;
  isSelected: (id: number) => boolean;
  onCheckboxClick: (cartItem: CartItem) => void;
  selectedItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
  getOneItemQuantity: (id: number) => number | undefined;
  setOneItemQuantity: (id: number, newQuantity: number) => void;
}

const ShoppingCartItem = ({
  cartItem,
  refetch,
  isSelected,
  onCheckboxClick,
  selectedItemQuantity,
  getOneItemQuantity,
  setOneItemQuantity,
}: ShoppingCartItemProps) => {
  const onDelete = async () => {
    await deleteCartItem(cartItem.id);
    await refetch();
  };

  const quantity = getOneItemQuantity(cartItem.id) ?? 0;

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
    setOneItemQuantity(cartItem.id, newQuantity);
    selectedItemQuantity(cartItem, newQuantity);
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(quantity - 1, 0);
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
    setOneItemQuantity(cartItem.id, newQuantity);
    selectedItemQuantity(cartItem, newQuantity);
  };

  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox isChecked={isSelected(cartItem.id)} onClick={() => onCheckboxClick(cartItem)} />
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
