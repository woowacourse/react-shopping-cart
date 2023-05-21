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
      <Flex width="100%" height="100%">
        <S.Checkbox
          type="checkbox"
          checked={selectedItems.has(id)}
          onChange={() => selectItem(id)}
        />
        <Flex width="100%" align="center">
          <S.Thumbnail alt={name} src={imageUrl} />
          <S.Name>{name}</S.Name>
          <S.Info>
            <Flex dir="column" justify="space-between" align="end">
              <S.DeleteButton onClick={deleteCartItem}>X</S.DeleteButton>
              <QuantityStepper
                max={100}
                min={1}
                init={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
              <S.Price>{price.toLocaleString()} 원</S.Price>
            </Flex>
          </S.Info>
        </Flex>
      </Flex>
    </S.Root>
  );
};

export default CartItem;
