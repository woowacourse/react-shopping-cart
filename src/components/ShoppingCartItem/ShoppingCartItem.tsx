import * as S from './styled';
import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import SetQuantity from '../SetQuantity/SetQuantity';
import { CartItem } from '../../api/get/getItems';

interface ShoppingCartItemProps {
  cartItem: CartItem;
  isSelected: (id: number) => boolean;
  onCheckboxClick: (cartItem: CartItem) => void;
  selectedItemQuantity: (cartItem: CartItem, newQuantity: number) => void;
  getOneItemQuantity: (id: number) => number | undefined;
  setOneItemQuantity: (id: number, newQuantity: number) => void;
}

const ShoppingCartItem = ({
  cartItem,
  isSelected,
  onCheckboxClick,
  selectedItemQuantity,
  getOneItemQuantity,
  setOneItemQuantity,
}: ShoppingCartItemProps) => {
  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox isChecked={isSelected(cartItem.id)} onClick={() => onCheckboxClick(cartItem)} />
        <DeleteButton />
      </S.Header>
      <S.Contents>
        <S.ProductImage src={cartItem.product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{cartItem.product.name}</S.ProductName>
          <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          <SetQuantity
            cartItem={cartItem}
            selectedItemQuantity={selectedItemQuantity}
            getOneItemQuantity={getOneItemQuantity}
            setOneItemQuantity={setOneItemQuantity}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;
