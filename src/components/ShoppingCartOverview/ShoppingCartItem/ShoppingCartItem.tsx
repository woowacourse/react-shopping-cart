import * as S from './styled';
import { CartItem } from '@type/cartItem';
import useDeleteCartItem from '@api/delete/deleteCartItem';
import useChangeCartItemQuantity from '@api/patch/changeCartItemQuantity';
import Checkbox from '@components/common/Checkbox/Checkbox';
import Stepper from '@components/common/Stepper/Stepper';

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
  const { changeCartItemQuantity } = useChangeCartItemQuantity(refetch);
  const { deleteCartItem } = useDeleteCartItem(refetch);

  const onDelete = async () => {
    if (window.confirm('정말 상품을 삭제하시겠습니까?')) await deleteCartItem(cartItem.id);
  };

  const handleIncrement = async () => {
    const newQuantity = cartItem.quantity + 1;
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(cartItem.quantity - 1, 0);
    await changeCartItemQuantity({ id: cartItem.id, quantity: newQuantity });
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
            value={cartItem.quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;
