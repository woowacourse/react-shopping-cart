import ListItem from '../ListItem';
import ListItemInfo from '../ListItemInfo';
import ListItemBody from '../ListItemBody';
import QuantityController from '../../QuantityController/QuantityController';
import CartItemHeader from './CartItemHeader';

import { PatchCartItemProps } from '../../../types/cartApi';
import { CartItemProps } from '../../../types/cartItem';

function CartItem({
  cartItem,
  isSelected,
  handleSelectItem,
  onIncreaseCartItemClick,
  onDecreaseCartItemClick,
  onDeleteCartItemClick,
}: {
  cartItem: CartItemProps;
  isSelected: boolean;
  handleSelectItem: (cartItemId: number) => void;
  onIncreaseCartItemClick: ({
    cartItemId,
    quantity,
  }: PatchCartItemProps) => Promise<void>;
  onDecreaseCartItemClick: ({
    cartItemId,
    quantity,
  }: PatchCartItemProps) => Promise<void>;
  onDeleteCartItemClick: (cartItemId: number) => Promise<void>;
}) {
  return (
    <ListItem>
      <CartItemHeader
        cartItemId={cartItem.id}
        isSelected={isSelected}
        handleSelectItem={handleSelectItem}
        onDeleteCartItemClick={onDeleteCartItemClick}
      />
      <ListItemBody
        imageUrl={cartItem.product.imageUrl}
        name={cartItem.product.name}
      >
        <ListItemInfo
          name={cartItem.product.name}
          price={cartItem.product.price}
        >
          <QuantityController
            cartItemId={cartItem.id}
            quantity={cartItem.quantity}
            onDecreaseCartItemClick={onDecreaseCartItemClick}
            onIncreaseCartItemClick={onIncreaseCartItemClick}
          />
        </ListItemInfo>
      </ListItemBody>
    </ListItem>
  );
}

export default CartItem;
