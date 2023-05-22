import { DELETE_CART_ITEM } from '../../../constants/cart';
import { useCartSelector, useMutateCart } from '../../../hooks/cart/cart';
import { CartItem as CartItemType } from '../../../types/cart';
import Flex from '../../common/Flex';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './CartItem.styles';

type CartItemProps = CartItemType;

const CartItem: React.FC<CartItemProps> = (props) => {
  const {
    id,
    quantity,
    product: { imageUrl, name, price },
  } = props;
  const { selectedItems, selectItem } = useCartSelector();
  const { updateCartItemMutation, deleteCartItemMutation } = useMutateCart();

  const increaseQuantity = () =>
    updateCartItemMutation({ id, quantity: Math.min(100, quantity + 1) });

  const decreaseQuantity = () =>
    updateCartItemMutation({ id, quantity: Math.max(1, quantity - 1) });

  const deleteCartItem = () => {
    confirm(DELETE_CART_ITEM) && deleteCartItemMutation([id]);
  };

  return (
    <S.Root>
      <Flex grow height="100%">
        <S.Checkbox
          type="checkbox"
          checked={selectedItems.has(id)}
          onChange={() => selectItem(id)}
        />
        <S.ProductContainer align="center" grow>
          <S.Thumbnail alt={name} src={imageUrl} />
          <S.Name>{name}</S.Name>
          <S.Info dir="column" justify="space-between" align="end">
            <S.DeleteButton onClick={deleteCartItem}>X</S.DeleteButton>
            <QuantityStepper
              max={100}
              min={1}
              init={quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
            <S.Price>{price.toLocaleString()} 원</S.Price>
          </S.Info>
        </S.ProductContainer>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
