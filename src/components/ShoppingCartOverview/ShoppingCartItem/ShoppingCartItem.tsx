import * as S from './styled';
import { CartItem } from '@type/cartItem';
import Checkbox from '@components/common/Checkbox/Checkbox';
import Stepper from '@components/common/Stepper/Stepper';
import useMutation from '@hooks/useMutation';
import deleteCartItem from '@api/delete/deleteCartItem';
import changeCartItemQuantity from '@api/patch/changeCartItemQuantity';

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
  const { mutate: deleteMutate } = useMutation<typeof deleteCartItem>(deleteCartItem, {
    onSuccess: refetch,
  });

  const { mutate: changeQuantityMutate } = useMutation<typeof changeCartItemQuantity>(
    changeCartItemQuantity,
    {
      onSuccess: refetch,
    },
  );

  const onDelete = async () => {
    if (window.confirm('정말 상품을 삭제하시겠습니까?')) await deleteMutate(cartItem.id);
  };

  const handleIncrement = async () => {
    const newQuantity = cartItem.quantity + 1;
    await changeQuantityMutate({ id: cartItem.id, quantity: newQuantity });
  };

  const handleDecrement = async () => {
    const newQuantity = Math.max(cartItem.quantity - 1, 1);
    await changeQuantityMutate({ id: cartItem.id, quantity: newQuantity });
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
